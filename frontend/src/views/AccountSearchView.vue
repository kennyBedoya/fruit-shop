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

const loadAccounts = async () => {
  try {
    await accountsStore.fetchAccounts()
  } catch (err) {
    console.error('Error loading accounts:', err)
  }
}

const handleTransactionCreated = async () => {
  await loadAccounts()
}

onMounted(() => {
  loadAccounts()
})
</script>

<template>
  <div class="account-search-view">
    <div class="page-header">
      <div>
        <h1>Buscar cuenta</h1>
        <p>Busca una cuenta para registrar una transacción.</p>
      </div>
    </div>

    <div
      v-if="error"
      class="error-message"
    >
      No fue posible cargar las cuentas.
    </div>

    <AccountSearch
      :accounts="accounts"
      :loading="loading"
      @transaction-created="handleTransactionCreated"
    />
  </div>
</template>

<style scoped>
.account-search-view {
  width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
  color: var(--color-text);
  font-size: 24px;
  font-weight: 700;
}

.page-header p {
  margin: 5px 0 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.error-message {
  margin-bottom: 20px;
  padding: 12px 14px;
  border-radius: 6px;
  background: #ffebee;
  color: var(--color-danger);
  font-size: 13px;
}

@media (max-width: 768px) {
  .page-header {
    margin-bottom: 18px;
  }

  .page-header h1 {
    font-size: 20px;
  }
}
</style>