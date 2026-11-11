<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useUsersStore } from '@/stores/users'
import UserTable from '@/components/users/UserTable.vue'
import UserForm from '@/components/users/UserForm.vue'
import api from '@/services/api'

const usersStore = useUsersStore()

const {
  users,
  loading,
  error,
} = storeToRefs(usersStore)

const showForm = ref(false)
const selectedUser = ref(null)
const accounts = ref([])
const accountsLoading = ref(false)

const formLoading = computed(() => loading.value)


const usersWithAccountStatus = computed(() => {
  return users.value.map((user) => {
    const account = accounts.value.find(
      (item) =>
        Number(item.usuario_id) === Number(user.id_usuario)
    )

    let cuenta_estado = 'sin_cuenta'

    if (accountsLoading.value) {
      cuenta_estado = 'cargando'
    } else if (account) {
      cuenta_estado = 'abierta'
    }

    return {
      ...user,
      cuenta_estado,
    }
  })
})


onMounted(async () => {
  await Promise.all([
    usersStore.fetchUsers(),
    fetchAccounts(),
  ])
})


const fetchAccounts = async () => {
  accountsLoading.value = true

  try {
    const response = await api.get('/cuentas')
    accounts.value = response.data.data
  } catch (err) {
    console.error('Error cargando cuentas:', err)
    accounts.value = []
  } finally {
    accountsLoading.value = false
  }
}


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
    console.error('Error guardando usuario:', err)
  }
}

const deactivateUser = async (user) => {
  const confirmed = window.confirm(
    `¿Deseas desactivar al usuario ${user.nombre} ${user.apellidos}?`
  )

  if (!confirmed) return

  try {
    await usersStore.deactivateUser(user.id_usuario)
  } catch (err) {
    console.error('Error desactivando usuario:', err)
  }
}

const activateUser = async (user) => {
  const confirmed = window.confirm(
    `¿Deseas activar al usuario ${user.nombre} ${user.apellidos}?`
  )

  if (!confirmed) return

  try {
    await usersStore.activateUser(user.id_usuario)
  } catch (err) {
    console.error('Error activando usuario:', err)
  }
}

const createAccount = async (user) => {
  const confirmed = window.confirm(
    `¿Deseas crear una cuenta para ${user.nombre} ${user.apellidos}?`
  )

  if (!confirmed) return

  try {
    // Comprobar que el usuario no tenga ya una cuenta.
    const existingAccount = accounts.value.find(
      (account) =>
        Number(account.usuario_id) === Number(user.id_usuario)
    )

    if (existingAccount) {
      window.alert('Este usuario ya tiene una cuenta.')
      return
    }

    await api.post('/cuentas', {
      usuario_id: user.id_usuario,
      saldo_anterior: 0,
      saldo_actual: 0,
      ultima_transaccion_id: null,
      acudiente_id: null,
    })

    await fetchAccounts()

    window.alert(
      `La cuenta de ${user.nombre} ${user.apellidos} se creó correctamente.`
    )
  } catch (err) {
    console.error('Error creando cuenta:', err)

    window.alert(
      err.response?.data?.message ||
      'No fue posible crear la cuenta.'
    )
  }
}

const pauseAccount = (user) => {
  window.alert(
    `La pausa de cuenta para ${user.nombre} ${user.apellidos} requiere conectar el endpoint de pausa de cuentas.`
  )
}
</script>

<template>
  <section class="users-view">
    <header class="page-header">
      <div>
        <h1>Usuarios</h1>
        <p>Gestión de usuarios registrados.</p>
      </div>

      <button
        type="button"
        class="create-button"
        @click="openCreateForm"
      >
        + Crear usuario
      </button>
    </header>

    <div v-if="error" class="error-message">
      No fue posible cargar los usuarios.
    </div>

    <UserTable
      :users="usersWithAccountStatus"
      :loading="loading"
      @edit="openEditForm"
      @deactivate="deactivateUser"
      @activate="activateUser"
      @create-account="createAccount"
      @pause-account="pauseAccount"
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
  cursor: pointer;
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
