import api from './axiosConfig'

export const fetchArtists = async () => {
  try {
    const response = await api.get('artists/')
    return response.data.results
  } catch (error) {
    console.error('Erro ao buscar artistas:', error)
    throw error
  }
}

export const createArtist = async (name, birthday, nationality) => {
  try {
    const response = await api.post('artists/', {
      name: name,
      birthday: birthday,
      nationality: nationality
    })
    return response.data
  } catch (error) {
    console.error('Erro ao criar artista:', error)
    throw error
  }
}
