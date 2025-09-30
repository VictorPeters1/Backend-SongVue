import api from './axiosConfig'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('authentication/token', {
      username: username,
      password: password
    })

    const token = response.data.access
    Cookies.set('authToken', token, { expires: 1 })
    return response.data
  } catch (error) {
    console.error('Erro durante a autenticação:', error)
    throw error
  }
}

export const createUser = async (userData) => {
  return await api.post('authentication/users', userData)
}

export const getUserInfoFromToken = async () => {
  const token = Cookies.get('authToken')
  if (token) {
    try {
      const decodedToken = jwtDecode(token)
      const userInfo = {
        userId: decodedToken.user_id,
        username: decodedToken.username
      }
      return userInfo
    } catch (error) {
      console.error('Token inválido ou erro ao decodificar', error)
    }
  }
}
