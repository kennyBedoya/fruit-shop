<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useUsersStore } from '@/stores/users'

import UserTable from '@/components/users/UserTable.vue'

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

  transition:
    background 0.2s ease,
    transform 0.1s ease;
}

.create-button:hover {
  background: var(--color-primary-dark);
}

.create-button:active {
  transform: translateY(1px);
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