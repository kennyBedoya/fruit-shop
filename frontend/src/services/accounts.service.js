import api from './api'

const getAccounts = async () => {
  const response = await api.get('/cuentas')

  return response.data
}

const getAccountByUser = async (userId) => {
  const response = await api.get(`/cuentas/usuario/${userId}`)

  return response.data
}

const createAccount = async (account) => {
  const response = await api.post('/cuentas', account)

  return response.data
}

const updateAccount = async (id, account) => {
  const response = await api.put(`/cuentas/${id}`, account)

  return response.data
}

export default {
  getAccounts,
  getAccountByUser,
  createAccount,
  updateAccount,
}