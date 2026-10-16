import { defineStore } from 'pinia'
import { ref } from 'vue'
import authService from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const initialized = ref(false)
  const loading = ref(false)

  const isAuthenticated = ref(false)

  const initializeSession = async () => {
    if (initialized.value) {
      return
    }

    loading.value = true

    try {
      const response = await authService.getSession()
      user.value = response.data.user
      isAuthenticated.value = true
    } catch {
      user.value = null
      isAuthenticated.value = false
    } finally {
      initialized.value = true
      loading.value = false
    }
  }

  const login = async (credentials) => {
    loading.value = true

    try {
      const response = await authService.login(credentials)
      user.value = response.data.user
      isAuthenticated.value = true
      initialized.value = true

      return user.value
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true

    try {
      await authService.logout()
      user.value = null
      isAuthenticated.value = false
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    initialized,
    loading,
    isAuthenticated,
    initializeSession,
    login,
    logout,
  }
})
