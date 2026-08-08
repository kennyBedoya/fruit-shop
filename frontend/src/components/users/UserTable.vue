<script setup>
defineProps({
  users: {
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
  'deactivate',
  'activate'
])
</script>

<template>
  <div class="table-container">

    <div v-if="loading" class="table-state">
      Cargando usuarios...
    </div>

    <div v-else-if="users.length === 0" class="table-state">
      No hay usuarios registrados.
    </div>

    <table v-else class="users-table">

      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Tipo</th>
          <th>Teléfono</th>
          <th>Correo</th>
          <th>Edad</th>
          <th>Institución</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>

        <tr
          v-for="user in users"
          :key="user.id_usuario"
        >
          <td>{{ user.id_usuario }}</td>

          <td>{{ user.nombre }}</td>

          <td>{{ user.apellidos }}</td>

          <td>{{ user.tipo_usuario }}</td>

          <td>{{ user.telefono }}</td>

          <td>{{ user.correo }}</td>

          <td>{{ user.edad }}</td>

          <td>{{ user.institucion }}</td>

          <td>
            <span
              class="status"
              :class="user.activo ? 'status-active' : 'status-inactive'"
            >
              {{ user.activo ? 'Activo' : 'Inactivo' }}
            </span>
          </td>

          <td>
            <div class="actions">
              <button
                type="button"
                class="action-button edit"
                @click="emit('edit', user)"
              >
                Editar
              </button>

              <button
                v-if="user.activo"
                type="button"
                class="action-button deactivate"
                @click="emit('deactivate', user)"
              >
                Desactivar
              </button>

              <button
                v-else
                type="button"
                class="action-button activate"
                @click="emit('activate', user)"
              >
                Activar
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

.users-table {
  width: 100%;
  border-collapse: collapse;

  min-width: 1000px;
}

.users-table th,
.users-table td {
  padding: 14px 16px;

  text-align: left;

  border-bottom: 1px solid var(--color-border);
}

.users-table th {
  background: #fafafa;

  color: var(--color-text-secondary);

  font-size: 13px;
  font-weight: 600;

  white-space: nowrap;
}

.users-table td {
  font-size: 14px;
}

.users-table tbody tr:hover {
  background: #fafafa;
}

.status {
  display: inline-flex;

  padding: 4px 10px;

  border-radius: 20px;

  font-size: 12px;
  font-weight: 600;
}

.status-active {
  background: #e8f5e9;
  color: var(--color-success);
}

.status-inactive {
  background: #ffebee;
  color: var(--color-danger);
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

.deactivate {
  background: #ffebee;
  color: var(--color-danger);
}

.table-state {
  padding: 50px 20px;

  text-align: center;

  color: var(--color-text-secondary);
}

.activate {
  background: #e8f5e9;
  color: var(--color-success);
}

@media (max-width: 768px) {
  .table-container {
    border-radius: 6px;
  }

  .users-table th,
  .users-table td {
    padding: 12px;
  }
}
</style>