import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ArtistsView from '@/views/ArtistsView.vue'
import ReviewView from '@/views/ReviewView.vue'
import BaseLayout from '@/components/BaseLayout.vue'
import SongsView from '@/views/SongsView.vue'
import CreateUserView from '@/views/CreateUserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: CreateUserView
    },
    {
      path: '/',
      component: BaseLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: HomeView
        },
        {
          path: 'artists',
          name: 'Artists',
          component: ArtistsView
        },
        {
          path: 'songs',
          name: 'Songs',
          component: SongsView
        },
        {
          path: 'reviews',
          name: 'Reviews',
          component: ReviewView
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('authToken')
  const protectedRoutes = ['Artists', 'Songs', 'Reviews', 'Home']
  if (protectedRoutes.includes(to.name) && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
