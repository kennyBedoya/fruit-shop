<template>
  <footer class="app-footer">

    <div class="footer-content">

      <span>
        © 2026 Frutería
      </span>

      <span>
        Virtual Store
      </span>

    </div>

  </footer>
</template>

<style scoped>
.app-footer {
  width: 100%;

  margin-top: auto;

  background: #1b1b1b;

  color: white;
}

.footer-content {
  width: 100%;
  max-width: var(--container-width);

  min-height: 70px;

  margin: 0 auto;

  padding: 0 var(--spacing-lg);

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 14px;
}

@media (max-width: 768px) {

  .footer-content {
    min-height: 60px;

    padding: 0 var(--spacing-md);

    font-size: 12px;
  }

}
</style>