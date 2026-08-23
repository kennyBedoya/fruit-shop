<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAccountsStore } from '@/stores/accounts'

import AccountTable from '@/components/accounts/AccountTable.vue'
import AccountForm from '@/components/accounts/AccountForm.vue'

const accountsStore = useAccountsStore()

const {
  accounts,
  loading,
  error,
} = storeToRefs(accountsStore)

const showForm = ref(false)
const selectedAccount = ref(null)

const formLoading = computed(() => loading.value)

onMounted(() => {
  accountsStore.fetchAccounts()
})

const openCreateForm = () => {
  selectedAccount.value = null
  showForm.value = true
}

const openEditForm = (account) => {
  selectedAccount.value = account
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  selectedAccount.value = null
}

const handleSubmit = async (account) => {
  try {
    if (selectedAccount.value) {
      await accountsStore.updateAccount(
        selectedAccount.value.id_cuentas,
        account
      )
    } else {
      await accountsStore.createAccount(account)
    }

    closeForm()
  } catch (err) {
    console.error('Error saving account:', err)
  }
}
</script>

<template>
  <section class="accounts-view">

    <header class="page-header">

      <div>
        <h1>Cuentas</h1>

        <p>
          Gestión de cuentas de usuarios.
        </p>
      </div>

      <button
        type="button"
        class="create-button"
        @click="openCreateForm"
      >
        + Crear cuenta
      </button>

    </header>

    <div
      v-if="error"
      class="error-message"
    >
      No fue posible cargar las cuentas.
    </div>

    <AccountTable
      :accounts="accounts"
      :loading="loading"
      @edit="openEditForm"
    />

    <AccountForm
      v-if="showForm"
      :account="selectedAccount"
      :loading="formLoading"
      @submit="handleSubmit"
      @cancel="closeForm"
    />

  </section>
</template>

<style scoped>
.accounts-view {
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