<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import { useAccountsStore } from '@/stores/accounts'

import AccountSearch from '@/components/accounts/AccountSearch.vue'

const accountsStore = useAccountsStore()

const {
  accounts,
  loading,
  error,
} = storeToRefs(accountsStore)

onMounted(() => {
  accountsStore.fetchAccounts()
})
</script>

<template>
  <section class="account-search-view">

    <header class="page-header">

      <div>
        <h1>Buscar cuenta</h1>

        <p>
          Busca una cuenta por nombre o apellido del usuario.
        </p>
      </div>

    </header>

    <div
      v-if="error"
      class="error-message"
    >
      No fue posible cargar las cuentas.
    </div>

    <AccountSearch
      :accounts="accounts"
      :loading="loading"
    />

  </section>
</template>

<style scoped>
.account-search-view {
  width: 100%;
}

.page-header {
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

.error-message {
  margin-bottom: var(--spacing-lg);

  padding: 14px 16px;

  border-radius: var(--border-radius);

  background: #ffebee;
  color: var(--color-danger);

  font-size: 14px;
}
</style>