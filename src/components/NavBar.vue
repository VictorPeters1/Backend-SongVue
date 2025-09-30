<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark py-3">
      <div class="container">
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <img src="/src/assets/logo.png" alt="Logo" class="" />
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/" exact-active-class="active" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/artists" class="nav-link" active-class="active">{{
                $t('artists')
              }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/songs" class="nav-link" active-class="active">{{
                $t('musics')
              }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/reviews" class="nav-link" active-class="active">{{
                $t('reviews')
              }}</router-link>
            </li>
          </ul>

          <!-- Botão de Ação -->
          <div class="d-flex align-items-center ms-3">
            <template v-if="isAuthenticated">
              <button @click="handleLogout" class="btn btn-light" style="color: #7c0a02">
                {{ $t('logout') }}
              </button>
            </template>
            <template v-else>
              <router-link to="/login"
                ><button class="btn btn-light text-primary">{{ $t('enter') }}</button></router-link
              >
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'Navbar',
  data() {
    return {
      isAuthenticated: false
    }
  },
  created() {
    this.checkAuthentication()
  },
  methods: {
    checkAuthentication() {
      const token = Cookies.get('authToken')
      this.isAuthenticated = !!token
    },
    handleLogout() {
      Cookies.remove('authToken')
      this.isAuthenticated = false
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #7c0a02;
}

.navbar-brand img {
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

.navbar-nav .nav-link {
  font-size: 1.1rem;
  margin-right: 1rem;
}

.navbar-nav .nav-link.active {
  font-weight: bold;
  border-bottom: 2px solid #fff;
}

.btn-light {
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-weight: bold;
}

@media (max-width: 992px) {
  .navbar-nav .nav-link {
    margin-right: 0;
    text-align: center;
    padding: 0.5rem 0;
  }
}
</style>
