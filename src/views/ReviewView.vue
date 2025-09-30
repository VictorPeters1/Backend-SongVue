<template>
  <div class="container">
    <ReviewList :reviews="reviews" :songs="songs" />
  </div>
</template>

<script>
import { fetchReviews } from '@/api/reviews'
import { fetchSongs } from '@/api/songs'
import ReviewList from '@/components/ReviewList.vue'

export default {
  components: {
    ReviewList
  },
  data() {
    return {
      reviews: [],
      songs: []
    }
  },
  async created() {
    try {
      this.reviews = await fetchReviews()
    } catch (error) {
      console.error('Erro ao carregar os artistas:', error)
    }
    try {
      this.songs = await fetchSongs()
    } catch (error) {
      console.error('Erro ao carregar os músicas:', error)
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
