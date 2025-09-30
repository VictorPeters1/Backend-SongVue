<template>
  <div class="song-list container">
    <div class="d-flex align-items-center mb-4">
      <button
        class="btn text-white me-2"
        @click="openCreateSongModal"
        style="background-color: #7c0a02"
      >
        {{ $t('create_music') }}
      </button>
      <button
        class="btn text-white"
        @click="openCreateGenreModal"
        style="background-color: #7c0a02"
      >
        {{ $t('create_genre') }}
      </button>
    </div>

    <table class="table table-hover table-bordered">
      <thead class="table-primary">
        <tr>
          <th>#</th>
          <th>{{ $t('musics') }}</th>
          <th>{{ $t('genre') }}</th>
          <th>{{ $t('rating_average') }}</th>
          <th>{{ $t('artists') }}</th>
          <th>{{ $t('release_date') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in songs" :key="song.id">
          <td>{{ index + 1 }}</td>
          <td>{{ song.title }}</td>
          <td>{{ song.genre?.name || '-' }}</td>
          <td>{{ song.rate || '-' }}</td>
          <td>
            <span v-for="(artist, idx) in song.artists" :key="artist.id">
              {{ artist.name }}<span v-if="idx < song.artists.length - 1">, </span>
            </span>
          </td>
          <td>{{ formatDate(song.release_date) || '-' }}</td>
        </tr>
      </tbody>
    </table>

    <CreateGenre
      :show="showCreateGenreModal"
      @close="showCreateGenreModal = false"
      @genre-created="addGenre"
    />

    <CreateSong
      :show="showCreateSongModal"
      :genres="genres"
      :artists="artists"
      @close="showCreateSongModal = false"
      @song-created="addSong"
    />
  </div>
</template>

<script>
import { fetchArtists } from '@/api/artists'
import { fetchGenres } from '@/api/genres'
import CreateSong from '@/components/CreateSong.vue'
import Swal from 'sweetalert2'
import CreateGenre from './CreateGenre.vue'

export default {
  components: {
    CreateSong,
    CreateGenre
  },
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      genres: [],
      artists: [],
      showCreateSongModal: false,
      showCreateGenreModal: false
    }
  },
  mounted() {
    this.loadGenres()
    this.loadArtists()
  },
  methods: {
    async loadGenres() {
      const title = this.$t('error')
      const text = this.$t('unknown_error')
      try {
        const response = await fetchGenres()
        this.genres = response
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error)
        Swal.fire({
          icon: 'error',
          title: title,
          text: text
        })
      }
    },
    async loadArtists() {
      const title = this.$t('error')
      const text = this.$t('unknown_error')
      try {
        const response = await fetchArtists()
        this.artists = response
      } catch (error) {
        console.error('Erro ao buscar artistas:', error)
        Swal.fire({
          icon: 'error',
          title: title,
          text: text
        })
      }
    },
    openCreateSongModal() {
      this.showCreateSongModal = true
    },
    openCreateGenreModal() {
      this.showCreateGenreModal = true
    },
    formatDate(date) {
      if (!date) return null
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(date).toLocaleDateString(undefined, options)
    },
    addSong(newSong) {
      this.songs.push(newSong)
      this.showCreateSongModal = false
      const title = this.$t('sucess')
      const text = this.$t('sucess_music')
      Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        confirmButtonText: 'OK'
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    },
    addGenre(newGenre) {
      this.genres.push(newGenre)
      this.showCreateSongModal = false
      const title = this.$t('sucess')
      const text = this.$t('sucess_genre')
      Swal.fire({
        title: title,
        icon: 'success',
        text: text,
        confirmButtonText: 'OK'
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.table {
  margin-bottom: 2rem;
}

.table th {
  background-color: #7c0a02;
  color: white;
  font-weight: bold;
  text-align: center;
}

.table td {
  text-align: center;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .table {
    font-size: 0.9rem;
  }
}
</style>
