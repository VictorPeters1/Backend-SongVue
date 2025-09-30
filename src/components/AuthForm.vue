<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg" style="width: 100%; max-width: 400px">
      <h1 class="text-center mb-4">Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">{{ $t('user') }}</label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            id="username"
            :placeholder="$t('enter_user')"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">{{ $t('password') }}</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            :placeholder="$t('enter_password')"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
        <div class="text-center">
          <router-link to="/register" class="btn btn-link">{{
            $t('message_register')
          }}</router-link>
        </div>
      </form>
      <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/api/auth'

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await loginUser(this.username, this.password)
        this.errorMessage = ''

        this.$router.push({ name: 'Home' })
      } catch (error) {
        this.errorMessage = this.$t('login_failed')
      }
    }
  }
}
</script>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
