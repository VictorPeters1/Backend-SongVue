<template>
  <div class="container">
    <SongsList :songs="songs" :artists="artists" />
  </div>
</template>

<script>
import { fetchSongs } from '@/api/songs'
import SongsList from '@/components/SongsList.vue'

export default {
  components: {
    SongsList
  },
  data() {
    return {
      songs: [],
      artists: []
    }
  },
  async created() {
    try {
      this.songs = await fetchSongs()
    } catch (error) {
      console.error('Erro ao carregar os songs:', error)
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
