import api from './axiosConfig'

// Listar músicas
export const fetchSongs = async () => {
  try {
    const response = await api.get('songs')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar músicas:', error)
    throw error
  }
}

// Criar música
export const createSong = async (song) => {
  try {
    const response = await api.post('songs', song)
    return response.data
  } catch (error) {
    console.error('Erro ao criar música:', error)
    throw error
  }
}

// Editar música
export const updateSong = async (id, updatedSong) => {
  try {
    const response = await api.put(`songs/${id}`, updatedSong)
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar música:', error)
    throw error
  }
}

// Deletar música
export const deleteSong = async (id) => {
  try {
    await api.delete(`songs/${id}`)
  } catch (error) {
    console.error('Erro ao deletar música:', error)
    throw error
  }
}
