<template>
  <header class="app-header">

    <div class="header-content">

      <RouterLink to="/" class="brand">
        <span class="brand-icon">🍎</span>
        <span>Frutería</span>
      </RouterLink>

      <nav class="navigation">

        <RouterLink to="/usuarios">
          Usuarios
        </RouterLink>

        <RouterLink to="/cuentas">
          Cuentas
        </RouterLink>

        <RouterLink to="/transacciones">
          Transacciones
        </RouterLink>

      </nav>

      <div class="user-menu">

        <span class="user-avatar">
          KB
        </span>

        <span class="user-name">
          Kenny
        </span>

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

  border-radius: 50%;

  background: var(--color-primary-light);

  font-size: 13px;
  font-weight: 700;
}

.user-name {
  font-size: 14px;
}

@media (max-width: 768px) {

  .header-content {
    min-height: 60px;

    padding: 0 var(--spacing-md);
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

  .user-name {
    display: none;
  }

}
</style>