import api from './axiosConfig'

export const fetchSongs = async () => {
  try {
    const response = await api.get('songs/')
    return response.data.results
  } catch (error) {
    console.error('Erro ao buscar songs:', error)
    throw error
  }
}

export const createSong = async (songData) => {
  try {
    const response = await api.post('songs/', {
      title: songData.title,
      artists: songData.artists,
      genre: songData.genre,
      release_date: songData.release_date
    })
    return response.data
  } catch (error) {
    console.error('Erro ao buscar songs:', error)
    throw error
  }
}
