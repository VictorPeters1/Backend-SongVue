<template>
  <div class="login-view">
    <CreateUser />
  </div>
</template>

<script>
import CreateUser from '@/components/CreateUser.vue'

export default {
  components: {
    CreateUser
  }
}
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}
</style>
