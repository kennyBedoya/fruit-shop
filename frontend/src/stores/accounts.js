import { defineStore } from 'pinia'
import { ref } from 'vue'
import accountsService from '@/services/accounts.service'

export const useAccountsStore = defineStore('accounts', () => {

  const accounts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchAccounts = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await accountsService.getAccounts()

      accounts.value = response.data

      return response.data

    } catch (err) {

      error.value = err

      console.error('Error fetching accounts:', err)

      throw err

    } finally {

      loading.value = false

    }
  }

  const fetchAccountByUser = async (userId) => {
    loading.value = true
    error.value = null

    try {

      const response = await accountsService.getAccountByUser(userId)

      return response.data

    } catch (err) {

      error.value = err

      console.error('Error fetching account:', err)

      throw err

    } finally {

      loading.value = false

    }
  }

  const createAccount = async (account) => {
    loading.value = true
    error.value = null

    try {

      const response = await accountsService.createAccount(account)

      accounts.value.push(response.data)

      return response.data

    } catch (err) {

      error.value = err

      console.error('Error creating account:', err)

      throw err

    } finally {

      loading.value = false

    }
  }

  const updateAccount = async (id, account) => {
    loading.value = true
    error.value = null

    try {

      const response = await accountsService.updateAccount(id, account)

      const index = accounts.value.findIndex(
        (currentAccount) => currentAccount.id_cuentas === id
      )

      if (index !== -1) {
        accounts.value[index] = response.data
      }

      return response.data

    } catch (err) {

      error.value = err

      console.error('Error updating account:', err)

      throw err

    } finally {

      loading.value = false

    }
  }

  return {
    accounts,
    loading,
    error,
    fetchAccounts,
    fetchAccountByUser,
    createAccount,
    updateAccount,
  }
})