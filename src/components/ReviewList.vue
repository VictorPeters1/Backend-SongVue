<template>
  <div class="review-list container">
    <div class="d-flex justify-content-between mb-4">
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          :placeholder="$t('search_review')"
          v-model="searchTerm"
        />
      </div>
      <button
        class="btn text-white"
        @click="openCreateReviewModal"
        style="background-color: #7c0a02"
      >
        {{ $t('create_review') }}
      </button>
    </div>

    <table class="table table-hover table-bordered">
      <thead class="table-primary">
        <tr>
          <th>#</th>
          <th>{{ $t('musics') }}</th>
          <th>{{ $t('reviews') }}</th>
          <th>{{ $t('comment') }}</th>
          <th>{{ $t('users') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(review, index) in filteredReviews" :key="review.id">
          <td>{{ review.id }}</td>
          <td>{{ review.song.title }}</td>
          <td>
            <span v-for="n in 5" :key="n" class="star">
              <i class="fas" :class="n <= review.stars ? 'fa-star' : 'fa-star-o'"></i>
            </span>
          </td>
          <td>{{ review.comment }}</td>
          <td>{{ review.user.username }}</td>
        </tr>
      </tbody>
    </table>

    <p v-if="filteredReviews.length === 0" class="text-center">Nenhuma review encontrada.</p>

    <CreateReview
      :show="showCreateReviewModal"
      :songs="songs"
      @close="closeCreateReviewModal"
      @review-created="addReview"
    />
  </div>
</template>

<script>
import CreateReview from './CreateReview.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    CreateReview
  },
  props: {
    reviews: {
      type: Array,
      required: true
    },
    songs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchTerm: '',
      showCreateReviewModal: false
    }
  },
  computed: {
    filteredReviews() {
      return this.reviews.filter((review) => {
        const lowerSearchTerm = this.searchTerm.toLowerCase()
        return (
          review.song?.title?.toLowerCase().includes(lowerSearchTerm) ||
          review.comment.toLowerCase().includes(lowerSearchTerm)
        )
      })
    }
  },
  methods: {
    openCreateReviewModal() {
      this.showCreateReviewModal = true
    },
    closeCreateReviewModal() {
      this.showCreateReviewModal = false
    },
    addReview(newReview) {
      const song = this.songs.find((s) => s.id === newReview.song)
      if (song) {
        newReview.song = song
      }
      this.reviews.push(newReview)
      this.showModal = false
      const text = this.$t('sucess_review')
      const title = this.$t('sucess')
      Swal.fire({
        icon: 'success',
        title: title,
        text: text,
        confirmButtonText: 'OK',
        timer: 2000
      })
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    },
    formatDate(date) {
      if (!date) return null
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(date).toLocaleDateString(undefined, options)
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

.star {
  color: #ffc107;
  font-size: 1.2rem;
  margin-right: 0.2rem;
}

.input-group {
  max-width: 500px;
}

@media (max-width: 768px) {
  .table {
    font-size: 0.9rem;
  }

  .star {
    font-size: 1rem;
  }

  .input-group {
    max-width: 100%;
  }
}
</style>
