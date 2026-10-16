
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const correo = ref('')
const password = ref('')
const errorMessage = ref('')
const submitting = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''

  if (!correo.value.trim() || !password.value) {
    errorMessage.value = 'Ingresa tu correo y contraseña.'
    return
  }

  submitting.value = true

  try {
    await authStore.login({
      correo: correo.value.trim(),
      password: password.value,
    })

    const redirect = route.query.redirect

    const destination =
      typeof redirect === 'string' &&
      redirect.startsWith('/') &&
      !redirect.startsWith('//') &&
      redirect !== '/login'
        ? redirect
        : '/'

    await router.replace(destination)
  } catch (error) {
    errorMessage.value =
      error?.response?.data?.message ||
      'No fue posible iniciar sesión. Intenta nuevamente.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="login-page">
    <section class="login-card">
      <div class="login-header">
        <div class="login-logo">F</div>
        <h1>Iniciar sesión</h1>
        <p>Ingresa tus credenciales para continuar.</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="correo">Correo electrónico</label>

          <input
            id="correo"
            v-model="correo"
            type="email"
            placeholder="usuario@ejemplo.com"
            autocomplete="username"
            required
            :disabled="submitting"
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>

          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            autocomplete="current-password"
            required
            :disabled="submitting"
          />
        </div>

        <div
          v-if="errorMessage"
          class="error-message"
          role="alert"
        >
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          class="login-button"
          :disabled="submitting"
        >
          {{ submitting ? 'Ingresando...' : 'Iniciar sesión' }}
        </button>
      </form>

      <p class="login-footer">
        Sistema de administración de frutería
      </p>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 32px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
}

.login-header {
  margin-bottom: 28px;
  text-align: center;
}

.login-logo {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  border-radius: 14px;
  background: var(--color-primary);
  color: white;
  font-size: 26px;
  font-weight: 700;
}

.login-header h1 {
  margin: 0;
  color: var(--color-text);
  font-size: 24px;
  font-weight: 700;
}

.login-header p {
  margin: 8px 0 0;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.12);
}

.form-group input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-button {
  width: 100%;
  border: 0;
  padding: 12px 18px;
  border-radius: var(--border-radius);
  background: var(--color-primary);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.login-button:hover:not(:disabled) {
  background: var(--color-primary-dark);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  padding: 12px 14px;
  border-radius: 6px;
  background: #ffebee;
  color: var(--color-danger);
  font-size: 13px;
}

.login-footer {
  margin: 24px 0 0;
  color: var(--color-text-secondary);
  font-size: 12px;
  text-align: center;
}

@media (max-width: 480px) {
  .login-card {
    padding: 24px 20px;
  }
}
</style>
