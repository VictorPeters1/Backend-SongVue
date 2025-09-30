import api from './axiosConfig'

export const fetchGenres = async () => {
  try {
    const response = await api.get('genres/')
    return response.data.results
  } catch (error) {
    console.error('Erro ao buscar genres:', error)
    throw error
  }
}

export const createGenre = async (genreData) => {
  try {
    const response = await api.post('genres/', {
      name: genreData.name
    })
    return response.data
  } catch (error) {
    console.error('Erro ao buscar genres:', error)
    throw error
  }
}
