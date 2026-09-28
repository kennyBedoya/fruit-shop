<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  accounts: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const search = ref('')

const filteredAccounts = computed(() => {
  const query = search.value.trim().toLowerCase()

  if (!query) {
    return props.accounts
  }

  return props.accounts.filter((account) => {
    const fullName =
      `${account.nombre ?? ''} ${account.apellidos ?? ''}`.toLowerCase()

    return fullName.includes(query)
  })
})
</script>

<template>
  <div class="search-container">

    <div class="search-header">
      <label for="account-search">
        Buscar cuenta
      </label>

      <input
        id="account-search"
        v-model="search"
        type="search"
        placeholder="Buscar por nombre o apellido..."
      />
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

    <div
      v-else
      class="accounts-list"
    >

      <article
        v-for="account in filteredAccounts"
        :key="account.id_cuentas"
        class="account-card"
      >

        <div class="account-info">

          <div class="account-avatar">
            {{ account.nombre?.charAt(0)?.toUpperCase() }}
          </div>

          <div>
            <h3>
              {{ account.nombre }} {{ account.apellidos }}
            </h3>

            <p>
              Cuenta #{{ account.id_cuentas }}
            </p>
          </div>

        </div>

        <div class="account-balance">

          <span class="balance-label">
            Saldo actual
          </span>

          <strong>
            $ {{ Number(account.saldo_actual || 0).toLocaleString('es-CO') }}
          </strong>

        </div>

      </article>

    </div>

  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
}

.search-header {
  display: flex;
  flex-direction: column;

  gap: 8px;

  margin-bottom: var(--spacing-lg);
}

.search-header label {
  font-size: 13px;
  font-weight: 600;
}

.search-header input {
  width: 100%;

  padding: 12px 14px;

  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);

  background: var(--color-surface);

  outline: none;

  font-size: 14px;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.search-header input:focus {
  border-color: var(--color-primary);

  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.12);
}

.accounts-list {
  display: flex;
  flex-direction: column;

  gap: 12px;
}

.account-card {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 18px 20px;

  background: var(--color-surface);

  border-radius: var(--border-radius);

  box-shadow: var(--shadow-sm);

  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.account-card:hover {
  box-shadow: var(--shadow-md);
}

.account-info {
  display: flex;
  align-items: center;

  gap: 14px;
}

.account-avatar {
  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 50%;

  background: var(--color-primary);
  color: white;

  font-size: 17px;
  font-weight: 600;
}

.account-info h3 {
  margin: 0 0 4px;

  font-size: 15px;
}

.account-info p {
  margin: 0;

  color: var(--color-text-secondary);

  font-size: 13px;
}

.account-balance {
  display: flex;
  flex-direction: column;

  align-items: flex-end;

  gap: 4px;
}

.balance-label {
  color: var(--color-text-secondary);

  font-size: 12px;
}

.account-balance strong {
  color: var(--color-primary);

  font-size: 17px;
}

.table-state {
  padding: 50px 20px;

  text-align: center;

  color: var(--color-text-secondary);

  background: var(--color-surface);

  border-radius: var(--border-radius);

  box-shadow: var(--shadow-sm);
}

@media (max-width: 600px) {
  .account-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .account-balance {
    align-items: flex-start;

    width: 100%;

    padding-top: 12px;

    border-top: 1px solid var(--color-border);
  }
}
</style>