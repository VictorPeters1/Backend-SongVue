import express from "express";
import fs from "fs";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data.json");
const SECRET_KEY = "supersecretkey"; 

function readData() {
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Backend funcionando" });
});

// -----------------------------
// USERS - Registro e Login
// -----------------------------

// Registro de novo usuário
app.post("/authentication/users", async (req, res) => {
  const data = readData();
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha obrigatórios" });
  }

  const userExists = data.users.find((u) => u.username === username);
  if (userExists) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: data.nextUserId++,
    username,
    password: hashedPassword,
  };

  data.users.push(newUser);
  writeData(data);

  const userResponse = {
    id: newUser.id,
    username: newUser.username
  };

  res.status(201).json({
    message: "Usuário criado com sucesso",
    user: userResponse
  });
});


// Login de usuário
app.post("/authentication/token", async (req, res) => {
  const data = readData();
  const { username, password } = req.body;

  const user = data.users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: "Usuário não encontrado" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Senha incorreta" });
  }

  const token = jwt.sign(
    { user_id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ access: token });
});

// -----------------------------
// SONGS 
// -----------------------------

// Transforma ID de gênero em objeto completo
function normalizeGenre(data, genreId) {
  if (!genreId) return null;
  return data.genres.find(g => g.id === genreId) || null;
}

// Transforma lista de IDs em lista de artistas
function normalizeArtists(data, artistIds) {
  if (!artistIds || !Array.isArray(artistIds)) return [];

  return artistIds
    .map(id => data.artists.find(a => a.id === id))
    .filter(a => a !== undefined);
}

// listar músicas
app.get("/songs/", (req, res) => {
  const data = readData();
  res.json(data.songs);
});

// criar música 
app.post("/songs/", (req, res) => {
  const data = readData();

  const genreObj = normalizeGenre(data, req.body.genre);
  const artistObjs = normalizeArtists(data, req.body.artists);

  const newSong = {
    id: data.nextSongId++,
    title: req.body.title,
    release_date: req.body.release_date || null,
    rate: req.body.rate || null,
    genre: genreObj,
    artists: artistObjs
  };

  data.songs.push(newSong);
  writeData(data);

  res.status(201).json(newSong);
});

// editar música 
app.put("/songs/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);

  const songIndex = data.songs.findIndex(song => song.id === id);
  if (songIndex === -1) {
    return res.status(404).json({ error: "Música não encontrada" });
  }

  const genreObj = normalizeGenre(data, req.body.genre);
  const artistObjs = normalizeArtists(data, req.body.artists);

  data.songs[songIndex] = {
    ...data.songs[songIndex],
    title: req.body.title,
    release_date: req.body.release_date,
    rate: req.body.rate,
    genre: genreObj,
    artists: artistObjs
  };

  writeData(data);
  res.json(data.songs[songIndex]);
});

// deletar música
app.delete("/songs/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);

  data.songs = data.songs.filter(song => song.id !== id);
  writeData(data);

  res.json({ message: "Música removida" });
});

// -----------------------------
// ARTISTS 
// -----------------------------
app.get("/artists/", (req, res) => {
  const data = readData();
  res.json(data.artists);
});

app.post("/artists/", (req, res) => {
  const data = readData();
  const artist = { id: data.nextArtistId++, ...req.body };
  data.artists.push(artist);
  writeData(data);
  res.status(201).json(artist);
});

// -----------------------------
// GENRES 
// -----------------------------
app.get("/genres/", (req, res) => {
  const data = readData();
  res.json(data.genres);
});

app.post("/genres/", (req, res) => {
  const data = readData();
  const genre = { id: data.nextGenreId++, ...req.body };
  data.genres.push(genre);
  writeData(data);
  res.status(201).json(genre);
});

// -----------------------------
// REVIEWS 
// -----------------------------
app.get("/reviews", (req, res) => {
  const data = readData();

  const userId = parseInt(req.query.user || req.query.userId);

  let reviews = data.reviews.map(r => {
    return {
      ...r,
      song: data.songs.find(s => s.id === r.song),
      user: data.users.find(u => u.id === r.user_id)
    };
  });

  if (!isNaN(userId)) {
    reviews = reviews.filter(r => r.user_id === userId);
  }

  res.json(reviews);
});


app.post("/reviews/", (req, res) => {
  const data = readData();
  const review = { id: data.nextReviewId++, ...req.body };
  data.reviews.push(review);
  writeData(data);
  res.status(201).json(review);
});

app.put("/reviews/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  const index = data.reviews.findIndex((r) => r.id === id);

  if (index === -1)
    return res.status(404).json({ error: "Review não encontrada" });

  const updated = {
    ...data.reviews[index],
    stars: req.body.stars,
    comment: req.body.comment
  };

  data.reviews[index] = updated;
  writeData(data);

  res.json(updated);
});

app.delete("/reviews/:id", (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);
  data.reviews = data.reviews.filter((r) => r.id !== id);
  writeData(data);
  res.json({ message: "Review removida" });
});

// -----------------------------
// Iniciar servidor
// -----------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
