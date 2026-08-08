<script setup>
import { onMounted } from 'vue'
import usersService from '@/services/users.service'

onMounted(async () => {
  try {
    const response = await usersService.getUsers()

    console.log('Usuarios:', response)
  } catch (error) {
    console.error('Error obteniendo usuarios:', error)
  }
})
</script>

<template>
  <section>
    <h1>Usuarios</h1>
  </section>
</template>