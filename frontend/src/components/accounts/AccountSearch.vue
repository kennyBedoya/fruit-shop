<script setup>
import { computed, nextTick, ref } from 'vue'
import transactionsService from '@/services/transactions.service'

const props = defineProps({
  accounts: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['transaction-created'])

const search = ref('')
const selectedAccount = ref(null)
const transactionType = ref(null)
const amount = ref('')
const paymentMethod = ref(null)
const description = ref('')
const submitting = ref(false)
const transactionError = ref(null)
const transactionSuccess = ref(null)
const amountInput = ref(null)

const filteredAccounts = computed(() => {
  const query = search.value.trim().toLowerCase()

  if (!query) {
    return props.accounts
  }

  return props.accounts.filter((account) => {
    const fullName = `${account.nombre ?? ''} ${account.apellidos ?? ''}`.toLowerCase()

    return fullName.includes(query)
  })
})

const formattedAmount = computed(() => {
  if (!selectedAccount.value) {
    return '$0'
  }

  return formatCurrency(selectedAccount.value.saldo_actual)
})

const openTransaction = async (account) => {
  selectedAccount.value = account
  transactionType.value = null
  amount.value = ''
  paymentMethod.value = null
  description.value = ''
  transactionError.value = null
  transactionSuccess.value = null

  await nextTick()

  if (amountInput.value) {
    amountInput.value.focus()
  }
}

const closeTransaction = () => {
  if (submitting.value) {
    return
  }

  selectedAccount.value = null
  transactionType.value = null
  amount.value = ''
  paymentMethod.value = null
  description.value = ''
  transactionError.value = null
  transactionSuccess.value = null
}

const selectTransactionType = async (type) => {
  transactionType.value = type

  await nextTick()

  if (amountInput.value) {
    amountInput.value.focus()
  }
}

const handleSubmit = async () => {
  transactionError.value = null
  transactionSuccess.value = null

  if (!selectedAccount.value) {
    return
  }

  if (!transactionType.value) {
    transactionError.value = 'Selecciona el tipo de transacción.'
    return
  }

  const numericAmount = Number(amount.value)

  if (!numericAmount || numericAmount <= 0) {
    transactionError.value = 'Ingresa un monto válido.'
    return
  }

  if (!paymentMethod.value) {
    transactionError.value = 'Selecciona el medio de pago.'
    return
  }

  submitting.value = true

  try {
    const payload = {
      usuario_id: selectedAccount.value.usuario_id,
      tipo_transaccion_id: Number(transactionType.value),
      monto: numericAmount,
      medio_pago_id: Number(paymentMethod.value),
    }

    if (description.value.trim()) {
      payload.descripcion = description.value.trim()
    }

    const response = await transactionsService.createTransaction(payload)

    transactionSuccess.value =
      response?.data?.message || 'Transacción registrada correctamente.'

    emit('transaction-created', {
      account: selectedAccount.value,
      transaction: response?.data?.data || response?.data,
    })

    /*
     * Dejamos el formulario listo para otra operación sobre
     * la misma cuenta. Esto permite registrar varias transacciones
     * rápidamente sin volver al buscador.
     */
    amount.value = ''
    description.value = ''

    await nextTick()

    if (amountInput.value) {
      amountInput.value.focus()
    }
  } catch (error) {
    transactionError.value =
      error?.response?.data?.message ||
      'No fue posible registrar la transacción.'
  } finally {
    submitting.value = false
  }
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    closeTransaction()
  }
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}
</script>

<template>
  <div class="search-container">
    <div class="search-box">
      <span class="search-icon">🔍</span>

      <input
        v-model="search"
        type="text"
        placeholder="Buscar cuenta por nombre..."
        aria-label="Buscar cuenta por nombre"
      />

      <button
        v-if="search"
        type="button"
        class="clear-search"
        @click="search = ''"
      >
        ×
      </button>
    </div>

    <div v-if="loading" class="table-state">
      Cargando cuentas...
    </div>

    <div
      v-else-if="filteredAccounts.length === 0"
      class="table-state"
    >
      No se encontraron cuentas.
    </div>

    <div v-else class="accounts-list">
      <button
        v-for="account in filteredAccounts"
        :key="account.id_cuentas"
        type="button"
        class="account-card"
        @click="openTransaction(account)"
      >
        <div class="account-avatar">
          {{ (account.nombre || '?').charAt(0).toUpperCase() }}
        </div>

        <div class="account-info">
          <div class="account-name">
            {{ account.nombre }} {{ account.apellidos }}
          </div>

          <div class="account-number">
            Cuenta #{{ account.id_cuentas }}
          </div>
        </div>

        <div class="account-balance">
          <span>Saldo actual</span>
          <strong>{{ formatCurrency(account.saldo_actual) }}</strong>
        </div>

        <div class="account-arrow">
          →
        </div>
      </button>
    </div>
  </div>

  <!-- Modal de transacción -->
  <div
    v-if="selectedAccount"
    class="modal-overlay"
    @click.self="closeTransaction"
    @keydown="handleKeydown"
  >
    <div class="transaction-modal">
      <div class="modal-header">
        <div>
          <h2>Registrar transacción</h2>
          <p>
            {{ selectedAccount.nombre }}
            {{ selectedAccount.apellidos }}
          </p>
        </div>

        <button
          type="button"
          class="close-button"
          :disabled="submitting"
          @click="closeTransaction"
        >
          ×
        </button>
      </div>

      <div class="account-summary">
        <span>Saldo actual</span>
        <strong>{{ formattedAmount }}</strong>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Tipo de transacción</label>

          <div class="transaction-types">
            <button
              type="button"
              class="type-button credit"
              :class="{ selected: transactionType === 1 }"
              @click="selectTransactionType(1)"
            >
              <span class="type-title">Crédito</span>
              <span class="type-description">Agregar crédito</span>
            </button>

            <button
              type="button"
              class="type-button payment"
              :class="{ selected: transactionType === 2 }"
              @click="selectTransactionType(2)"
            >
              <span class="type-title">Pago</span>
              <span class="type-description">Registrar pago</span>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="transaction-amount">Monto</label>

          <div class="amount-input">
            <span>$</span>

            <input
              id="transaction-amount"
              ref="amountInput"
              v-model="amount"
              type="number"
              min="1"
              step="1"
              placeholder="0"
              autocomplete="off"
              :disabled="submitting"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="payment-method">Medio de pago</label>

          <select
            id="payment-method"
            v-model="paymentMethod"
            :disabled="submitting"
          >
            <option :value="null" disabled>
              Selecciona un medio
            </option>

            <option :value="1">
              Efectivo
            </option>

            <option :value="2">
              Transferencia
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="transaction-description">
            Descripción
            <span>(opcional)</span>
          </label>

          <input
            id="transaction-description"
            v-model="description"
            type="text"
            placeholder="Descripción de la transacción..."
            maxlength="255"
            :disabled="submitting"
          />
        </div>

        <div
          v-if="transactionError"
          class="transaction-message error"
        >
          {{ transactionError }}
        </div>

        <div
          v-if="transactionSuccess"
          class="transaction-message success"
        >
          {{ transactionSuccess }}
        </div>

        <div class="modal-actions">
          <button
            type="button"
            class="button secondary"
            :disabled="submitting"
            @click="closeTransaction"
          >
            Cerrar
          </button>

          <button
            type="submit"
            class="button primary"
            :disabled="submitting"
          >
            {{ submitting ? 'Registrando...' : 'Registrar transacción' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.search-icon {
  position: absolute;
  left: 14px;
  font-size: 16px;
  pointer-events: none;
}

.search-box input {
  width: 100%;
  padding: 12px 42px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 14px;
  outline: none;
}

.search-box input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.12);
}

.clear-search {
  position: absolute;
  right: 10px;
  border: 0;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 22px;
  cursor: pointer;
}

.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.account-card {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  text-align: left;
  cursor: pointer;
  transition:
    box-shadow 0.15s ease,
    transform 0.15s ease,
    border-color 0.15s ease;
}

.account-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.account-avatar {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e8f5e9;
  color: var(--color-primary);
  font-size: 16px;
  font-weight: 700;
}

.account-info {
  flex: 1;
  min-width: 0;
}

.account-name {
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
}

.account-number {
  margin-top: 3px;
  color: var(--color-text-secondary);
  font-size: 12px;
}

.account-balance {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.account-balance span {
  color: var(--color-text-secondary);
  font-size: 11px;
}

.account-balance strong {
  margin-top: 3px;
  color: var(--color-primary);
  font-size: 15px;
}

.account-arrow {
  color: var(--color-text-secondary);
  font-size: 20px;
  margin-left: 4px;
}

.table-state {
  padding: 30px;
  text-align: center;
  color: var(--color-text-secondary);
}

/* Modal */

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
}

.transaction-modal {
  width: 100%;
  max-width: 560px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  padding: 24px;
  border-radius: var(--border-radius);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
}

.modal-header h2 {
  margin: 0;
  color: var(--color-text);
  font-size: 20px;
}

.modal-header p {
  margin: 5px 0 0;
  color: var(--color-text-secondary);
  font-size: 13px;
}

.close-button {
  border: 0;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
}

.account-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  padding: 14px 16px;
  border-radius: 8px;
  background: #f5f5f5;
}

.account-summary span {
  color: var(--color-text-secondary);
  font-size: 13px;
}

.account-summary strong {
  color: var(--color-primary);
  font-size: 19px;
}

.form-group {
  margin-bottom: 17px;
}

.form-group label {
  display: block;
  margin-bottom: 7px;
  color: var(--color-text);
  font-size: 13px;
  font-weight: 600;
}

.form-group label span {
  color: var(--color-text-secondary);
  font-weight: 400;
}

.transaction-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.type-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 13px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  cursor: pointer;
  text-align: left;
}

.type-button:hover {
  border-color: var(--color-primary);
}

.type-button.selected {
  border: 2px solid var(--color-primary);
  background: #e8f5e9;
}

.type-title {
  font-size: 14px;
  font-weight: 700;
}

.type-description {
  margin-top: 3px;
  color: var(--color-text-secondary);
  font-size: 11px;
}

.form-group input,
.form-group select {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 14px;
  outline: none;
}

.form-group input:focus,
.form-group select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.12);
}

.amount-input {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  overflow: hidden;
}

.amount-input:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.12);
}

.amount-input span {
  padding-left: 12px;
  color: var(--color-text-secondary);
  font-size: 15px;
  font-weight: 600;
}

.amount-input input {
  border: 0;
  box-shadow: none !important;
}

.transaction-message {
  margin-bottom: 16px;
  padding: 11px 13px;
  border-radius: 6px;
  font-size: 13px;
}

.transaction-message.error {
  background: #ffebee;
  color: var(--color-danger);
}

.transaction-message.success {
  background: #e8f5e9;
  color: var(--color-success);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
}

.button {
  border: 0;
  padding: 11px 18px;
  border-radius: var(--border-radius);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.button.primary {
  background: var(--color-primary);
  color: white;
}

.button.primary:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

.button.secondary {
  background: #eeeeee;
  color: var(--color-text);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .account-card {
    padding: 12px;
  }

  .account-balance {
    display: none;
  }

  .transaction-types {
    grid-template-columns: 1fr;
  }

  .modal-overlay {
    align-items: flex-end;
    padding: 0;
  }

  .transaction-modal {
    max-height: 90vh;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    padding: 20px;
  }

  .modal-actions {
    flex-direction: column-reverse;
  }

  .button {
    width: 100%;
  }
}
</style>