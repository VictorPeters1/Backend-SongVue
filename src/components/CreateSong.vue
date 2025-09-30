<template>
  <div v-if="show" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t('create_music') }}</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleCreateSong">
            <div class="form-group mb-3">
              <label for="song-title">{{ $t('title') }}</label>
              <input
                type="text"
                id="song-title"
                class="form-control"
                v-model="song.title"
                required
              />
            </div>
            <div class="form-group mb-3">
              <label for="song-release">{{ $t('release_date') }}</label>
              <input
                type="date"
                id="song-release"
                class="form-control"
                v-model="song.release_date"
              />
            </div>
            <div class="form-group mb-3">
              <label for="song-genre">{{ $t('genre') }}</label>
              <select id="song-genre" class="form-select" v-model="song.genre_id">
                <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                  {{ genre.name }}
                </option>
              </select>
            </div>
            <div class="form-group mb-3">
              <label for="song-artists">{{ $t('artists') }}</label>
              <select id="song-artists" class="form-control" v-model="selectedArtists" multiple>
                <option v-for="artist in artists" :key="artist.id" :value="artist.id">
                  {{ artist.name }}
                </option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">
                {{ $t('close') }}
              </button>
              <button type="submit" class="btn btn-primary">{{ $t('create_music') }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createSong } from '@/api/songs'
import Swal from 'sweetalert2'

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    genres: {
      type: Array,
      required: true
    },
    artists: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      song: {
        title: '',
        release_date: '',
        genre_id: null
      },
      selectedArtists: []
    }
  },
  methods: {
    async handleCreateSong() {
      const title = this.$t('error')
      const text = this.$t('error_song')
      try {
        const songData = {
          title: this.song.title,
          release_date: this.song.release_date === '' ? null : this.song.release_date,
          genre: this.song.genre_id,
          artists: this.selectedArtists
        }
        const newSong = await createSong(songData)

        this.$emit('song-created', newSong)
        this.closeModal()
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: title,
          text: text
        })
      }
    },
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  max-width: 500px;
  margin: 1.75rem auto;
}

.modal-content {
  border-radius: 5px;
}
</style>
