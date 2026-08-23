<script setup>
defineProps({
  accounts: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'edit',
])
</script>

<template>
  <div class="table-container">

    <div v-if="loading" class="table-state">
      Cargando cuentas...
    </div>

    <div v-else-if="accounts.length === 0" class="table-state">
      No hay cuentas registradas.
    </div>

    <table v-else class="accounts-table">

      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Saldo anterior</th>
          <th>Saldo actual</th>
          <th>Última transacción</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>

        <tr
          v-for="account in accounts"
          :key="account.id_cuentas"
        >
          <td>{{ account.id_cuentas }}</td>

          <td>{{ account.nombre }} {{ account.apellidos }}</td>

          <td>{{ account.saldo_anterior }}</td>

          <td>{{ account.saldo_actual }}</td>

          <td>
            {{ account.ultima_trasaccion_id || 'Sin transacciones' }}
          </td>

          <td>
            <div class="actions">

              <button
                type="button"
                class="action-button edit"
                @click="emit('edit', account)"
              >
                Editar
              </button>

            </div>
          </td>

        </tr>

      </tbody>

    </table>

  </div>
</template>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;

  background: var(--color-surface);
  border-radius: var(--border-radius);

  box-shadow: var(--shadow-sm);
}

.accounts-table {
  width: 100%;
  border-collapse: collapse;

  min-width: 800px;
}

.accounts-table th,
.accounts-table td {
  padding: 14px 16px;

  text-align: left;

  border-bottom: 1px solid var(--color-border);
}

.accounts-table th {
  background: #fafafa;

  color: var(--color-text-secondary);

  font-size: 13px;
  font-weight: 600;

  white-space: nowrap;
}

.accounts-table td {
  font-size: 14px;
}

.accounts-table tbody tr:hover {
  background: #fafafa;
}

.actions {
  display: flex;
  gap: 8px;
}

.action-button {
  border: 0;

  padding: 7px 12px;

  border-radius: 6px;

  font-size: 12px;
  font-weight: 600;

  transition: opacity 0.2s ease;
}

.action-button:hover {
  opacity: 0.8;
}

.edit {
  background: #e3f2fd;
  color: #1565c0;
}

.table-state {
  padding: 50px 20px;

  text-align: center;

  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .table-container {
    border-radius: 6px;
  }

  .accounts-table th,
  .accounts-table td {
    padding: 12px;
  }
}
</style>