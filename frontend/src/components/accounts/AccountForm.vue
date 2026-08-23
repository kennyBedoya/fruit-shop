<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  account: {
    type: Object,
    default: null,
  },
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
  usuario_id: '',
  saldo_anterior: '',
  saldo_actual: '',
  ultima_trasaccion_id: '',
})

const isEditing = computed(() => !!props.account)

const title = computed(() =>
  isEditing.value ? 'Editar cuenta' : 'Crear cuenta'
)

const submitText = computed(() =>
  isEditing.value ? 'Actualizar' : 'Crear'
)

const resetForm = () => {
  form.usuario_id = props.account?.usuario_id ?? ''
  form.saldo_anterior = props.account?.saldo_anterior ?? ''
  form.saldo_actual = props.account?.saldo_actual ?? ''
  form.ultima_trasaccion_id =
    props.account?.ultima_trasaccion_id ?? ''
}

watch(
  () => props.account,
  () => {
    resetForm()
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('submit', {
    usuario_id:
      form.usuario_id === ''
        ? null
        : Number(form.usuario_id),

    saldo_anterior:
      form.saldo_anterior === ''
        ? null
        : Number(form.saldo_anterior),

    saldo_actual:
      form.saldo_actual === ''
        ? null
        : Number(form.saldo_actual),

    ultima_trasaccion_id:
      form.ultima_trasaccion_id === ''
        ? null
        : Number(form.ultima_trasaccion_id),
  })
}
</script>

<template>
  <div class="modal-overlay">

    <div class="modal">

      <header class="modal-header">

        <h2>{{ title }}</h2>

        <button
          type="button"
          class="close-button"
          @click="emit('cancel')"
        >
          ×
        </button>

      </header>

      <form
        class="account-form"
        @submit.prevent="handleSubmit"
      >

        <div class="form-grid">

          <div class="form-group">
            <label for="usuario_id">
              Usuario
            </label>

            <input
              id="usuario_id"
              v-model="form.usuario_id"
              type="number"
              min="1"
              required
            />
          </div>

          <div class="form-group">
            <label for="saldo_anterior">
              Saldo anterior
            </label>

            <input
              id="saldo_anterior"
              v-model="form.saldo_anterior"
              type="number"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div class="form-group">
            <label for="saldo_actual">
              Saldo actual
            </label>

            <input
              id="saldo_actual"
              v-model="form.saldo_actual"
              type="number"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div class="form-group">
            <label for="ultima_trasaccion_id">
              Última transacción
            </label>

            <input
              id="ultima_trasaccion_id"
              v-model="form.ultima_trasaccion_id"
              type="number"
              min="1"
            />
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
            {{ loading ? 'Guardando...' : submitText }}
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

.account-form {
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

.form-group label {
  font-size: 13px;
  font-weight: 600;
}

.form-group input {
  width: 100%;

  padding: 10px 12px;

  border: 1px solid var(--color-border);
  border-radius: 6px;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.form-group input:focus {
  border-color: var(--color-primary);

  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.12);
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

  .modal-footer {
    flex-direction: column-reverse;
  }

  .button {
    width: 100%;
  }
}
</style>