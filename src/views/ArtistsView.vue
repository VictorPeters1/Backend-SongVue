<template>
  <div class="container">
    <ArtistList :artists="artists" />
  </div>
</template>

<script>
import { fetchArtists } from '@/api/artists'
import ArtistList from '@/components/ArtistList.vue'

export default {
  components: {
    ArtistList
  },
  data() {
    return {
      artists: []
    }
  },
  async created() {
    try {
      this.artists = await fetchArtists()
    } catch (error) {
      console.error('Erro ao carregar os artistas:', error)
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
