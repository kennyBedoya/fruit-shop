import { ref } from 'vue'
import { defineStore } from 'pinia'

import usersService from '@/services/users.service'

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selectedUser = ref(null)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await usersService.getUsers()

      users.value = response.data
    } catch (err) {
      error.value = err
      console.error('Error loading users:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await usersService.getUser(id)

      selectedUser.value = response.data
    } catch (err) {
      error.value = err
      console.error('Error loading user:', err)
    } finally {
      loading.value = false
    }
  }

  const createUser = async (user) => {
    loading.value = true
    error.value = null

    try {
      const response = await usersService.createUser(user)

      users.value.push(response.data)

      return response.data
    } catch (err) {
      error.value = err
      console.error('Error creating user:', err)

      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id, user) => {
    loading.value = true
    error.value = null

    try {
      const response = await usersService.updateUser(id, user)

      const index = users.value.findIndex(
        (currentUser) => currentUser.id_usuario === id
      )

      if (index !== -1) {
        users.value[index] = response.data
      }

      return response.data
    } catch (err) {
      error.value = err
      console.error('Error updating user:', err)

      throw err
    } finally {
      loading.value = false
    }
  }

  const deactivateUser = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await usersService.deactivateUser(id)

      const index = users.value.findIndex(
        (currentUser) => currentUser.id_usuario === id
      )

      if (index !== -1) {
        users.value[index] = response.data
      }

      return response.data
    } catch (err) {
      error.value = err
      console.error('Error deactivating user:', err)

      throw err
    } finally {
      loading.value = false
    }
  }

  const activateUser = async (id) => {
  loading.value = true
  error.value = null

  try {
    const response = await usersService.activateUser(id)

    const index = users.value.findIndex(
      (currentUser) => currentUser.id_usuario === id
    )

    if (index !== -1) {
      users.value[index] = response.data
    }

    return response.data
  } catch (err) {
    error.value = err
    console.error('Error activating user:', err)

    throw err
  } finally {
    loading.value = false
  }
}

  return {
    users,
    loading,
    error,
    selectedUser,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deactivateUser,
    activateUser,
  }
})