<template>
  <div v-if="show" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t('create_genre') }}</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleCreateGenre">
            <div class="form-group mb-3">
              <label for="artist-name">{{ $t('name') }}</label>
              <input type="text" id="artist-name" class="form-control" v-model="name" required />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">
                {{ $t('close') }}
              </button>
              <button type="submit" class="btn btn-primary">{{ $t('create_genre') }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createGenre } from '@/api/genres'
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
      name: ''
    }
  },
  methods: {
    async handleCreateGenre() {
      const text = this.$t('error_genre')
      const title = this.$t('error')
      try {
        const genreData = {
          name: this.name
        }

        const newGenre = await createGenre(genreData)
        this.$emit('genre-created', newGenre)

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
