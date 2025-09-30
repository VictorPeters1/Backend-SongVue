<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg" style="width: 100%; max-width: 400px">
      <h1 class="text-center mb-4">{{ $t('create_account') }}</h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="username" class="form-label">{{ $t('user') }}</label>
          <input v-model="username" type="text" class="form-control" id="username" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input v-model="email" type="email" class="form-control" id="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">{{ $t('password') }}</label>
          <input v-model="password" type="password" class="form-control" id="password" required />
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">{{ $t('confirm_password') }}</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="form-control"
            id="confirmPassword"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">{{ $t('register') }}</button>
      </form>
      <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { createUser } from '@/api/auth'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = $t('diff_passwords')
        return
      }

      try {
        const response = await createUser({
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.errorMessage = ''

        this.$router.push({ name: 'Login' })
      } catch (error) {
        this.errorMessage = $t('error_create_user')
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
