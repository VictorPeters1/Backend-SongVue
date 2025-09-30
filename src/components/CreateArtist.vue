<template>
  <div v-if="show" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t('create_artist') }}</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleCreateArtist">
            <div class="form-group mb-3">
              <label for="artist-name">{{ $t('name') }}</label>
              <input
                type="text"
                id="artist-name"
                class="form-control"
                v-model="artist.name"
                required
              />
            </div>
            <div class="form-group mb-3">
              <label for="artist-birthday">{{ $t('birthday') }}</label>
              <input
                type="date"
                id="artist-birthday"
                class="form-control"
                v-model="artist.birthday"
              />
            </div>
            <div class="form-group mb-3">
              <label for="artist-nationality">{{ $t('nationality') }}</label>
              <input
                type="text"
                id="artist-nationality"
                class="form-control"
                v-model="artist.nationality"
              />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">
                {{ $t('close') }}
              </button>
              <button type="submit" class="btn btn-primary">{{ $t('create_artist') }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArtist } from '@/api/artists'
import Swal from 'sweetalert2'

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      artist: {
        name: '',
        birthday: '',
        nationality: ''
      }
    }
  },
  methods: {
    async handleCreateArtist() {
      const text = this.$t('error_artist')
      const title = this.$t('error')
      try {
        const artistData = {
          name: this.artist.name,
          birthday: this.artist.birthday === '' ? null : this.artist.birthday,
          nationality: this.artist.nationality
        }

        const newArtist = await createArtist(
          artistData.name,
          artistData.birthday,
          artistData.nationality
        )
        this.$emit('artist-created', newArtist)

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
