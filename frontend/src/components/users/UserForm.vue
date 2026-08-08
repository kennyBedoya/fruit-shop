<script setup>
import { computed, reactive, watch } from 'vue'

const props = defineProps({
  user: {
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
  name: '',
  surname: '',
  type: '',
  phone: '',
  email: '',
  age: '',
  institution: '',
})

const isEditing = computed(() => !!props.user)

const title = computed(() =>
  isEditing.value ? 'Editar usuario' : 'Crear usuario'
)

const submitText = computed(() =>
  isEditing.value ? 'Actualizar' : 'Crear'
)

const resetForm = () => {
  form.name = props.user?.nombre ?? ''
  form.surname = props.user?.apellidos ?? ''
  form.type = props.user?.tipo_usuario ?? ''
  form.phone = props.user?.telefono ?? ''
  form.email = props.user?.correo ?? ''
  form.age = props.user?.edad ?? ''
  form.institution = props.user?.institucion ?? ''
}

watch(
  () => props.user,
  () => {
    resetForm()
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('submit', {
    ...form,
    age: form.age === '' ? null : Number(form.age),
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
        class="user-form"
        @submit.prevent="handleSubmit"
      >

        <div class="form-grid">

          <div class="form-group">
            <label for="name">
              Nombre
            </label>

            <input
              id="name"
              v-model="form.name"
              type="text"
              required
            />
          </div>

          <div class="form-group">
            <label for="surname">
              Apellidos
            </label>

            <input
              id="surname"
              v-model="form.surname"
              type="text"
              required
            />
          </div>

          <div class="form-group">
            <label for="type">
              Tipo de usuario
            </label>

            <input
              id="type"
              v-model="form.type"
              type="text"
              required
            />
          </div>

          <div class="form-group">
            <label for="phone">
              Teléfono
            </label>

            <input
              id="phone"
              v-model="form.phone"
              type="tel"
            />
          </div>

          <div class="form-group">
            <label for="email">
              Correo
            </label>

            <input
              id="email"
              v-model="form.email"
              type="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="age">
              Edad
            </label>

            <input
              id="age"
              v-model="form.age"
              type="number"
              min="0"
            />
          </div>

          <div class="form-group full-width">
            <label for="institution">
              Institución
            </label>

            <input
              id="institution"
              v-model="form.institution"
              type="text"
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

.user-form {
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