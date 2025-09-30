<template>
  <div>
    <Navbar />

    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from './NavBar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>
/* Estilos para o layout base */
.container {
  padding: 20px;
}
</style>
