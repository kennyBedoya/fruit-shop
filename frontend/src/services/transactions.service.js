import api from '@/services/api'

const transactionsService = {
  getTransactions() {
    return api.get('/transacciones')
  },

  createTransaction(transaction) {
    return api.post('/transacciones', transaction)
  },
}

export default transactionsService