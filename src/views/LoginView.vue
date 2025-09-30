<template>
  <div class="login-view">
    <AuthForm />
  </div>
</template>

<script>
import AuthForm from '@/components/AuthForm.vue'

export default {
  components: {
    AuthForm
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
