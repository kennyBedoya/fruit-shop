<script setup>
import { reactive } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'submit',
  'cancel',
])

const form = reactive({
  usuario_id: null,
  tipo_transaccion_id: null,
  monto: '',
  medio_pago_id: null,
  descripcion: '',
})

const handleSubmit = () => {
  emit('submit', {
    usuario_id: Number(form.usuario_id),
    tipo_transaccion_id: Number(form.tipo_transaccion_id),
    monto: Number(form.monto),
    medio_pago_id: Number(form.medio_pago_id),
    descripcion: form.descripcion || null,
  })
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">

      <header class="modal-header">
        <h2>Crear transacción</h2>

        <button
          type="button"
          class="close-button"
          @click="emit('cancel')"
        >
          ×
        </button>
      </header>

      <form
        class="transaction-form"
        @submit.prevent="handleSubmit"
      >

        <div class="form-grid">

          <div class="form-group">
            <label for="usuario_id">
              Usuario
            </label>

            <select
              id="usuario_id"
              v-model="form.usuario_id"
              required
            >
              <option :value="null" disabled>
                Seleccione un usuario
              </option>

              <option :value="1">
                Usuario 1
              </option>

              <option :value="2">
                Usuario 2
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="tipo_transaccion_id">
              Tipo de transacción
            </label>

            <select
              id="tipo_transaccion_id"
              v-model="form.tipo_transaccion_id"
              required
            >
              <option :value="null" disabled>
                Seleccione un tipo
              </option>

              <option :value="1">
                Crédito
              </option>

              <option :value="2">
                Pago
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="monto">
              Monto
            </label>

            <input
              id="monto"
              v-model="form.monto"
              type="number"
              min="1"
              step="0.01"
              required
            />
          </div>

          <div class="form-group">
            <label for="medio_pago_id">
              Medio de pago
            </label>

            <select
              id="medio_pago_id"
              v-model="form.medio_pago_id"
              required
            >
              <option :value="null" disabled>
                Seleccione un medio de pago
              </option>

              <option :value="1">
                Efectivo
              </option>

              <option :value="2">
                Tarjeta
              </option>
            </select>
          </div>

          <div class="form-group full-width">
            <label for="descripcion">
              Descripción
            </label>

            <textarea
              id="descripcion"
              v-model="form.descripcion"
              rows="3"
            ></textarea>
          </div>

        </div>

        <footer class="modal-footer">

          <button
            type="button"
            class="button secondary"
            :disabled="loading"
            @click="emit('cancel')"
          >
            Cancelar
          </button>

          <button
            type="submit"
            class="button primary"
            :disabled="loading"
          >
            {{ loading ? 'Guardando...' : 'Crear' }}
          </button>

        </footer>

      </form>

    </div>
  </div>
</template>

<style scoped>
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

.modal {
  width: 100%;
  max-width: 700px;
  max-height: 90vh;

  overflow-y: auto;

  background: var(--color-surface);

  border-radius: var(--border-radius);

  box-shadow: var(--shadow-md);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px 24px;

  border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
  margin: 0;

  font-size: 20px;
}

.close-button {
  width: 32px;
  height: 32px;

  border: 0;
  border-radius: 50%;

  background: transparent;

  font-size: 26px;
  line-height: 1;

  color: var(--color-text-secondary);
}

.close-button:hover {
  background: #f0f0f0;
}

.transaction-form {
  padding: 24px;
}

.form-grid {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;

  gap: 6px;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;

  padding: 10px 12px;

  border: 1px solid var(--color-border);
  border-radius: 6px;

  outline: none;

  font-family: inherit;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--color-primary);

  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.12);
}

.form-group textarea {
  resize: vertical;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;

  gap: 10px;

  margin-top: 24px;
}

.button {
  padding: 10px 18px;

  border: 0;
  border-radius: 6px;

  font-size: 14px;
  font-weight: 600;
}

.button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
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

.button.secondary:hover:not(:disabled) {
  background: #e0e0e0;
}

@media (max-width: 600px) {
  .modal-overlay {
    align-items: flex-end;
    padding: 0;
  }

  .modal {
    max-height: 95vh;
    border-radius: 14px 14px 0 0;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: auto;
  }

  .modal-footer {
    flex-direction: column-reverse;
  }

  .button {
    width: 100%;
  }
}
</style>