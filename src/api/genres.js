import api from './axiosConfig'

// Listar gêneros
export const fetchGenres = async () => {
  try {
    const response = await api.get('genres')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error)
    throw error
  }
}

// Criar gênero
export const createGenre = async (genreData) => {
  try {
    const response = await api.post('genres', {
      name: genreData.name
    })
    return response.data
  } catch (error) {
    console.error('Erro ao criar gênero:', error)
    throw error
  }
}
