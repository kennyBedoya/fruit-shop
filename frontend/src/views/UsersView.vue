<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()

const {
  users,
  loading,
  error,
} = storeToRefs(usersStore)

onMounted(() => {
  usersStore.fetchUsers()
})
</script>

<template>
  <section>

    <h1>Usuarios</h1>

    <p v-if="loading">
      Cargando usuarios...
    </p>

    <p v-else-if="error">
      Error cargando usuarios.
    </p>

    <pre v-else>{{ users }}</pre>

  </section>
</template>