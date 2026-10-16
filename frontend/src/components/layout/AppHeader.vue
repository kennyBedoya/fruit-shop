
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const userName = computed(() => {
  if (!authStore.user) {
    return ''
  }

  return [
    authStore.user.nombre,
    authStore.user.apellidos,
  ].filter(Boolean).join(' ')
})

const userInitials = computed(() => {
  const name = userName.value.trim()

  if (!name) {
    return ''
  }

  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
})

const handleLogout = async () => {
  try {
    await authStore.logout()
    await router.replace('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <RouterLink to="/" class="brand">
        <span class="brand-icon">🍎</span>
        <span>Frutería</span>
      </RouterLink>

      <nav
        v-if="authStore.isAuthenticated"
        class="navigation"
      >
        <RouterLink to="/usuarios">
          Usuarios
        </RouterLink>

        <RouterLink to="/cuentas">
          Cuentas
        </RouterLink>

        <RouterLink to="/transacciones">
          Transacciones
        </RouterLink>

        <RouterLink to="/buscar">
          Buscar Cuenta
        </RouterLink>
      </nav>

      <div
        v-if="authStore.isAuthenticated"
        class="user-menu"
      >
        <span class="user-avatar">
          {{ userInitials }}
        </span>

        <span class="user-name">
          {{ userName }}
        </span>

        <button
          type="button"
          class="logout-button"
          :disabled="authStore.loading"
          @click="handleLogout"
        >
          {{ authStore.loading ? 'Cerrando...' : 'Cerrar sesión' }}
        </button>
      </div>

      <RouterLink
        v-else-if="$route.name !== 'login'"
        to="/login"
        class="login-link"
      >
        Iniciar sesión
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  width: 100%;
  background: var(--color-primary);
  color: white;
  box-shadow: var(--shadow-sm);
}

.header-content {
  width: 100%;
  max-width: var(--container-width);
  min-height: 70px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
  box-sizing: border-box;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  text-decoration: none;
  font-size: 24px;
  font-weight: 700;
  white-space: nowrap;
}

.brand-icon {
  font-size: 28px;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-left: auto;
  margin-right: auto;
}

.navigation a {
  position: relative;
  padding: 24px 4px;
  color: white;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
}

.navigation a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 16px;
  height: 2px;
  background: white;
  transform: scaleX(0);
  transition: transform 0.2s ease;
}

.navigation a:hover::after,
.navigation a.router-link-active::after {
  transform: scaleX(1);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.user-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--color-primary-light);
  font-size: 13px;
  font-weight: 700;
}

.user-name {
  font-size: 14px;
}

.logout-button,
.login-link {
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: var(--border-radius);
  padding: 9px 12px;
  background: transparent;
  color: white;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease;
}

.logout-button:hover:not(:disabled),
.login-link:hover {
  background: rgba(255, 255, 255, 0.14);
}

.logout-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 1000px) {
  .header-content {
    gap: 16px;
    padding: 0 var(--spacing-md);
  }

  .navigation {
    gap: 16px;
  }

  .user-name {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-content {
    min-height: 60px;
  }

  .brand {
    font-size: 20px;
  }

  .brand-icon {
    font-size: 24px;
  }

  .navigation {
    display: none;
  }

  .user-menu {
    gap: 8px;
  }

  .user-avatar {
    width: 34px;
    height: 34px;
  }

  .logout-button,
  .login-link {
    padding: 8px 9px;
    font-size: 12px;
  }
}
</style>
