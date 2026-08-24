<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useTransactionsStore } from '@/stores/transactions'

import TransactionTable from '@/components/transactions/TransactionTable.vue'
import TransactionForm from '@/components/transactions/TransactionForm.vue'

const transactionsStore = useTransactionsStore()

const {
  transactions,
  loading,
  error,
} = storeToRefs(transactionsStore)

const showForm = ref(false)

const formLoading = computed(() => loading.value)

onMounted(() => {
  transactionsStore.fetchTransactions()
})

const openCreateForm = () => {
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
}

const handleSubmit = async (transaction) => {
  try {
    await transactionsStore.createTransaction(transaction)

    closeForm()
  } catch (err) {
    console.error('Error saving transaction:', err)
  }
}
</script>

<template>
  <section class="transactions-view">

    <header class="page-header">

      <div>
        <h1>Transacciones</h1>

        <p>
          Gestión de transacciones.
        </p>
      </div>

      <button
        type="button"
        class="create-button"
        @click="openCreateForm"
      >
        + Crear transacción
      </button>

    </header>

    <div
      v-if="error"
      class="error-message"
    >
      No fue posible cargar las transacciones.
    </div>

    <TransactionTable
      :transactions="transactions"
      :loading="loading"
    />

    <TransactionForm
      v-if="showForm"
      :loading="formLoading"
      @submit="handleSubmit"
      @cancel="closeForm"
    />

  </section>
</template>

<style scoped>
.transactions-view {
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