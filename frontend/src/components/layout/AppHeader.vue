
<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const isMobileMenuOpen = ref(false)

const userName = computed(() => {
  if (!authStore.user) return ''

  return [
    authStore.user.nombre,
    authStore.user.apellidos,
  ].filter(Boolean).join(' ')
})

const userInitials = computed(() => {
  const name = userName.value.trim()

  if (!name) return ''

  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
})

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    closeMobileMenu()
    await router.replace('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}
</script>

<template>
  <header class="app-header">
    <div class="header-content">
      <RouterLink
        to="/"
        class="brand"
        @click="closeMobileMenu"
      >
        <span class="brand-icon">🍎</span>
        <span>Frutería</span>
      </RouterLink>

      <nav
        v-if="authStore.isAuthenticated"
        class="navigation desktop-navigation"
      >
        <RouterLink to="/usuarios">Usuarios</RouterLink>
        <RouterLink to="/cuentas">Cuentas</RouterLink>
        <RouterLink to="/transacciones">Transacciones</RouterLink>
        <RouterLink to="/buscar">Buscar Cuenta</RouterLink>
      </nav>

      <div
        v-if="authStore.isAuthenticated"
        class="user-menu desktop-user-menu"
      >
        <span class="user-avatar">{{ userInitials }}</span>
        <span class="user-name">{{ userName }}</span>

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

      <button
        v-if="authStore.isAuthenticated"
        type="button"
        class="mobile-menu-button"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="mobile-navigation"
        :aria-label="isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <span :class="{ 'icon-open': isMobileMenuOpen }"></span>
        <span :class="{ 'icon-open': isMobileMenuOpen }"></span>
        <span :class="{ 'icon-open': isMobileMenuOpen }"></span>
      </button>
    </div>

    <div
      v-if="authStore.isAuthenticated && isMobileMenuOpen"
      id="mobile-navigation"
      class="mobile-menu"
    >
      <nav class="navigation mobile-navigation">
        <RouterLink to="/usuarios" @click="closeMobileMenu">
          Usuarios
        </RouterLink>

        <RouterLink to="/cuentas" @click="closeMobileMenu">
          Cuentas
        </RouterLink>

        <RouterLink to="/transacciones" @click="closeMobileMenu">
          Transacciones
        </RouterLink>

        <RouterLink to="/buscar" @click="closeMobileMenu">
          Buscar Cuenta
        </RouterLink>
      </nav>

      <div class="mobile-user-menu">
        <div class="mobile-user-info">
          <span class="user-avatar">{{ userInitials }}</span>
          <span class="mobile-user-name">{{ userName }}</span>
        </div>

        <button
          type="button"
          class="logout-button mobile-logout-button"
          :disabled="authStore.loading"
          @click="handleLogout"
        >
          {{ authStore.loading ? 'Cerrando...' : 'Cerrar sesión' }}
        </button>
      </div>
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

/* El botón y el panel móvil no aparecen en escritorio. */
.mobile-menu-button,
.mobile-menu {
  display: none;
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
    gap: 12px;
  }

  .brand {
    font-size: 20px;
  }

  .brand-icon {
    font-size: 24px;
  }

  .desktop-navigation,
  .desktop-user-menu {
    display: none;
  }

  .mobile-menu-button {
    width: 42px;
    height: 42px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
    border: 1px solid rgba(255, 255, 255, 0.45);
    border-radius: var(--border-radius);
    background: transparent;
    cursor: pointer;
  }

  .mobile-menu-button span {
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 2px;
    background: white;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .mobile-menu-button span:nth-child(1).icon-open {
    transform: translateY(7px) rotate(45deg);
  }

  .mobile-menu-button span:nth-child(2).icon-open {
    opacity: 0;
  }

  .mobile-menu-button span:nth-child(3).icon-open {
    transform: translateY(-7px) rotate(-45deg);
  }

  .mobile-menu {
    display: block;
    padding: 8px var(--spacing-md) 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .mobile-navigation {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    margin: 0;
  }

  .mobile-navigation a {
    padding: 14px 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }

  .mobile-navigation a::after {
    display: none;
  }

  .mobile-navigation a.router-link-active {
    font-weight: 700;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
  }

  .mobile-user-menu {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    padding-top: 18px;
  }

  .mobile-user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .mobile-user-info .user-avatar {
    width: 36px;
    height: 36px;
  }

  .mobile-user-name {
    overflow-wrap: anywhere;
    font-size: 14px;
    font-weight: 500;
  }

  .mobile-logout-button {
    width: 100%;
    padding: 12px;
    font-size: 14px;
  }

  .login-link {
    margin-left: auto;
  }
}
</style>
