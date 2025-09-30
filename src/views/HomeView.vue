<template>
  <div>
    <p>{{ $t('desc_home') }}</p>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t('musics') }}</th>
          <th>{{ $t('reviews') }}</th>
          <th>{{ $t('comment') }}</th>
          <th>{{ $t('actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(review, index) in reviews" :key="review.id">
          <td>{{ index + 1 }}</td>
          <td>{{ review.song.title }}</td>
          <td>{{ review.stars }}</td>
          <td>{{ review.comment }}</td>
          <td class="d-flex justify-content-start">
            <button class="btn btn-warning me-2" @click="openEditModal(review)">
              {{ $t('edit') }}
            </button>
            <button class="btn btn-danger" @click="deleteReview(review.id)">
              {{ $t('delete') }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showEditModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ $t('edit_review') }}</h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleEditReview">
              <div class="form-group">
                <label for="editComment">{{ $t('comment') }}</label>
                <textarea
                  id="editComment"
                  class="form-control"
                  v-model="selectedReview.comment"
                  required
                ></textarea>
              </div>
              <div class="form-group">
                <label for="editRating">{{ $t('rating_stars') }}</label>
                <input
                  type="number"
                  id="editRating"
                  class="form-control"
                  v-model="selectedReview.stars"
                  min="1"
                  max="5"
                  required
                />
              </div>
              <div class="d-flex justify-content-end mt-2">
                <button type="button" class="btn btn-secondary" @click="closeEditModal">
                  {{ $t('cancel') }}
                </button>
                <button type="submit" class="btn btn-primary ms-2">{{ $t('save') }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchReviewsByUser, updateReview, deleteReview } from '@/api/reviews'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      reviews: [],
      showEditModal: false,
      selectedReview: null
    }
  },
  async created() {
    try {
      this.reviews = await fetchReviewsByUser()
    } catch (error) {
      console.error('Erro ao carregar reviews:', error)
    }
  },
  methods: {
    openEditModal(review) {
      this.selectedReview = { ...review }
      this.showEditModal = true
    },
    closeEditModal() {
      this.showEditModal = false
      this.selectedReview = null
    },
    async handleEditReview() {
      try {
        await updateReview(this.selectedReview)
        this.showEditModal = false
        this.selectedReview = null
        this.reviews = await fetchReviewsByUser()
      } catch (error) {
        console.error('Erro ao editar review:', error)
      }
    },
    async deleteReview(reviewId) {
      try {
        const title = this.$t('sure')
        const text = this.$t('revert_action')
        const cancel = this.$t('cancel')
        const confirmBtn = this.$t('confirm_action')
        const result = await Swal.fire({
          title: title,
          text: text,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: confirmBtn,
          cancelButtonText: cancel
        })

        if (result.isConfirmed) {
          await deleteReview(reviewId)
          this.reviews = this.reviews.filter((review) => review.id !== reviewId)
          const title = this.$t('deleted')
          const text = this.$t('deleted_review')
          Swal.fire({
            title: title,
            text: text,
            icon: 'success'
          })
        }
      } catch (error) {
        console.error('Erro ao excluir review:', error)
        const title = this.$t('error')
        const text = this.$t('error_delete_review')
        Swal.fire({
          title: title,
          text: text,
          icon: 'error'
        })
      }
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
