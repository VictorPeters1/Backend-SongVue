import api from './axiosConfig'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

// Login
export const loginUser = async (username, password) => {
  try {
    const response = await api.post('authentication/token', {
      username,
      password
    })

    const token = response.data.access
    Cookies.set('authToken', token, { expires: 1 })
    return response.data
  } catch (error) {
    console.error('Erro no login:', error)
    throw error
  }
}

// Registro
export const createUser = async (userData) => {
  try {
    const response = await api.post('authentication/users', userData)
    return response.data
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    throw error
  }
}

export const getUserInfoFromToken = () => {
  const token = Cookies.get('authToken')
  if (!token) return null

  try {
    return jwtDecode(token)
  } catch (error) {
    console.error('Token inválido:', error)
    return null
  }
}
