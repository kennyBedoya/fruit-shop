import api from './api'

const getUsers = async () => {
  const response = await api.get('/usuarios')

  return response.data
}

const getUser = async (id) => {
  const response = await api.get(`/usuarios/${id}`)

  return response.data
}

const createUser = async (user) => {
  const response = await api.post('/usuarios', user)

  return response.data
}

const updateUser = async (id, user) => {
  const response = await api.put(`/usuarios/${id}`, user)

  return response.data
}

const deactivateUser = async (id) => {
  const response = await api.delete(`/usuarios/${id}`)

  return response.data
}

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deactivateUser,
}