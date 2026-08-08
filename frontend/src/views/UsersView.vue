<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useUsersStore } from '@/stores/users'

import UserTable from '@/components/users/UserTable.vue'
import UserForm from '@/components/users/UserForm.vue'

const usersStore = useUsersStore()

const {
  users,
  loading,
  error,
} = storeToRefs(usersStore)

const showForm = ref(false)
const selectedUser = ref(null)

const formLoading = computed(() => loading.value)

onMounted(() => {
  usersStore.fetchUsers()
})

const openCreateForm = () => {
  selectedUser.value = null
  showForm.value = true
}

const openEditForm = (user) => {
  selectedUser.value = user
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  selectedUser.value = null
}

const handleSubmit = async (user) => {
  try {
    if (selectedUser.value) {
      await usersStore.updateUser(
        selectedUser.value.id_usuario,
        user
      )
    } else {
      await usersStore.createUser(user)
    }

    closeForm()
  } catch (err) {
    console.error('Error saving user:', err)
  }
}

const deactivateUser = async (user) => {
  const confirmed = window.confirm(
    `¿Deseas desactivar al usuario ${user.nombre} ${user.apellidos}?`
  )

  if (!confirmed) {
    return
  }

  try {
    await usersStore.deactivateUser(user.id_usuario)
  } catch (err) {
    console.error('Error deactivating user:', err)
  }
}
</script>

<template>
  <section class="users-view">

    <header class="page-header">

      <div>
        <h1>Usuarios</h1>

        <p>
          Gestión de usuarios registrados.
        </p>
      </div>

      <button
        type="button"
        class="create-button"
        @click="openCreateForm"
      >
        + Crear usuario
      </button>

    </header>

    <div
      v-if="error"
      class="error-message"
    >
      No fue posible cargar los usuarios.
    </div>

    <UserTable
      :users="users"
      :loading="loading"
      @edit="openEditForm"
      @deactivate="deactivateUser"
    />

    <UserForm
      v-if="showForm"
      :user="selectedUser"
      :loading="formLoading"
      @submit="handleSubmit"
      @cancel="closeForm"
    />

  </section>
</template>

<style scoped>
.users-view {
  width: 100%;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: var(--spacing-lg);

  margin-bottom: var(--spacing-lg);
}

.page-header h1 {
  margin: 0 0 6px;

  font-size: 28px;
}

.page-header p {
  margin: 0;

  color: var(--color-text-secondary);

  font-size: 14px;
}

.create-button {
  border: 0;

  padding: 11px 18px;

  border-radius: var(--border-radius);

  background: var(--color-primary);
  color: white;

  font-size: 14px;
  font-weight: 600;
}

.create-button:hover {
  background: var(--color-primary-dark);
}

.error-message {
  margin-bottom: var(--spacing-lg);

  padding: 14px 16px;

  border-radius: var(--border-radius);

  background: #ffebee;
  color: var(--color-danger);

  font-size: 14px;
}

@media (max-width: 768px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .create-button {
    width: 100%;
  }
}
</style>