import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = Cookies.get('authToken')
    if (token) {
      Cookies.remove(token)
    }
    if (error.response && error.response.status === 401) {
      router.push({ name: 'Login' })
    }
    return Promise.reject(error)
  }
)

export default api
