import { ref } from 'vue'
import { defineStore } from 'pinia'

import transactionsService from '@/services/transactions.service'

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchTransactions = async () => {
    loading.value = true
    error.value = null

    try {
        const response = await transactionsService.getTransactions()

        transactions.value = response.data.data
    } catch (err) {
        error.value = err
        console.error('Error fetching transactions:', err)
    } finally {
        loading.value = false
    }
}

  const createTransaction = async (transaction) => {
    loading.value = true
    error.value = null

    try {
        const response = await transactionsService.createTransaction(
        transaction
        )

        transactions.value.unshift(response.data)

        return response.data
    } catch (err) {
        error.value = err
        console.error('Error creating transaction:', err)
        throw err
    } finally {
        loading.value = false
    }
    }

  return {
    transactions,
    loading,
    error,
    fetchTransactions,
    createTransaction,
  }
})