<script setup>
defineProps({
  transactions: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="table-container">

    <div v-if="loading" class="table-state">
      Cargando transacciones...
    </div>

    <div v-else-if="transactions.length === 0" class="table-state">
      No hay transacciones registradas.
    </div>

    <table v-else class="transactions-table">

      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Monto</th>
          <th>Tipo</th>
          <th>Estado</th>
          <th>Descripción</th>
          <th>Fecha</th>
        </tr>
      </thead>

      <tbody>

        <tr
          v-for="transaction in transactions"
          :key="transaction.id_transaccion || transaction.id"
        >
          <td>
            {{ transaction.id_transaccion || transaction.id }}
          </td>

          <td>
            {{ transaction.usuario_id }}
          </td>

          <td>
            $ {{ Number(transaction.monto).toFixed(2) }}
          </td>

          <td>
            {{ transaction.tipo }}
          </td>

          <td>
            <span
              class="status"
              :class="getStatusClass(transaction.estado)"
            >
              {{ transaction.estado }}
            </span>
          </td>

          <td>
            {{ transaction.descripcion || '—' }}
          </td>

          <td>
            {{ formatDate(transaction.created_at) }}
          </td>
        </tr>

      </tbody>

    </table>

  </div>
</template>

<script>
export default {
  methods: {
    formatDate(date) {
      if (!date) {
        return '—'
      }

      return new Date(date).toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
      })
    },

    getStatusClass(status) {
      switch (String(status || '').toUpperCase()) {
        case 'COMPLETADA':
        case 'COMPLETADO':
        case 'EXITOSA':
        case 'EXITOSO':
          return 'status-success'

        case 'PENDIENTE':
          return 'status-pending'

        case 'CANCELADA':
        case 'CANCELADO':
        case 'RECHAZADA':
        case 'RECHAZADO':
          return 'status-danger'

        default:
          return 'status-default'
      }
    },
  },
}
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;

  background: var(--color-surface);
  border-radius: var(--border-radius);

  box-shadow: var(--shadow-sm);
}

.transactions-table {
  width: 100%;
  border-collapse: collapse;

  min-width: 900px;
}

.transactions-table th,
.transactions-table td {
  padding: 14px 16px;

  text-align: left;

  border-bottom: 1px solid var(--color-border);
}

.transactions-table th {
  background: #fafafa;

  color: var(--color-text-secondary);

  font-size: 13px;
  font-weight: 600;

  white-space: nowrap;
}

.transactions-table td {
  font-size: 14px;
}

.transactions-table tbody tr:hover {
  background: #fafafa;
}

.status {
  display: inline-flex;

  padding: 4px 10px;

  border-radius: 20px;

  font-size: 12px;
  font-weight: 600;
}

.status-success {
  background: #e8f5e9;
  color: var(--color-success);
}

.status-pending {
  background: #fff8e1;
  color: #f57f17;
}

.status-danger {
  background: #ffebee;
  color: var(--color-danger);
}

.status-default {
  background: #eeeeee;
  color: var(--color-text-secondary);
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

  .transactions-table th,
  .transactions-table td {
    padding: 12px;
  }
}
</style>