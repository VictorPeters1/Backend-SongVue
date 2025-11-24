import api from './axiosConfig'
import { getUserInfoFromToken } from './auth'

// LISTAR todas reviews
export const fetchReviews = async () => {
  try {
    const response = await api.get('reviews')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar reviews:', error)
    throw error
  }
}

// LISTAR reviews do usuário logado
export const fetchReviewsByUser = async () => {
  try {
    const userInfo = getUserInfoFromToken()

    if (!userInfo) {
      throw new Error("Usuário não está logado")
    }

    const response = await api.get(`reviews?user=${userInfo.user_id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao buscar reviews do usuário:', error)
    throw error
  }
}

// CRIAR review
export const createReview = async (reviewData) => {
  try {
    const userInfo = getUserInfoFromToken()

    if (!userInfo) {
      throw new Error("Usuário não está logado")
    }

    const response = await api.post('reviews', {
      ...reviewData,
      user_id: userInfo.user_id
    })

    return response.data
  } catch (error) {
    console.error('Erro ao criar review:', error)
    throw error
  }
}

// Editar review
export const updateReview = async (reviewData) => {
  try {
    const response = await api.put(`reviews/${reviewData.id}`, reviewData)
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar review:', error)
    throw error
  }
}

// Deletar review
export const deleteReview = async (id) => {
  try {
    await api.delete(`reviews/${id}`)
  } catch (error) {
    console.error('Erro ao deletar review:', error)
    throw error
  }
}
