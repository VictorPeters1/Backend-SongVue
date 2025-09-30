import api from './axiosConfig'
import { getUserInfoFromToken } from '@/api/auth'

export const fetchReviews = async () => {
  try {
    const response = await api.get('reviews/')
    return response.data.results
  } catch (error) {
    console.error('Erro ao buscar reviews:', error)
    throw error
  }
}

export const fetchReviewsByUser = async () => {
  try {
    const userInfo = await getUserInfoFromToken()
    const response = await api.get(`reviews/?user__id=${userInfo.userId}`)
    return response.data.results
  } catch (error) {
    console.error('Erro ao buscar reviews por usuário:', error)
    throw error
  }
}

export const createReview = async (reviewData) => {
  try {
    const response = await api.post('reviews/', {
      song: reviewData.song,
      comment: reviewData.comment,
      stars: reviewData.stars,
      user: reviewData.user
    })
    return response.data
  } catch (error) {
    console.error('Erro ao criar reviews:', error)
    throw error
  }
}

export const updateReview = async (reviewData) => {
  try {
    const response = await api.put(`reviews/${reviewData.id}/`, {
      song: reviewData.song.id,
      comment: reviewData.comment,
      stars: reviewData.stars,
      user: reviewData.user.id
    })
    return response.data
  } catch (error) {
    console.error('Erro ao editar reviews:', error)
    throw error
  }
}

export const deleteReview = async (id) => {
  try {
    const response = await api.delete(`reviews/${id}/`)
    return response.data
  } catch (error) {
    console.error('Erro ao excluir reviews:', error)
    throw error
  }
}
