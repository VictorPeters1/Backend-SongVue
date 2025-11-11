import api from './axiosConfig'

// Listar artistas
export const fetchArtists = async () => {
  try {
    const response = await api.get('artists')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar artistas:', error)
    throw error
  }
}

// CrIar artista
export const createArtist = async (name, birthday, nationality) => {
  try {
    const response = await api.post('artists', {
      name,
      birthday,
      nationality
    })
    return response.data
  } catch (error) {
    console.error('Erro ao criar artista:', error)
    throw error
  }
}
