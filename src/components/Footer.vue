<template>
  <footer class="footer-container">
    <div class="footer-content">
      <img src="/logo-ms.png" alt="Montoni Tech Logo" class="footer-logo" />
      <div class="footer-info">
        <p>
          Montoni Tech Soluções Inova Simples (IS) - CNPJ: 62.553.238/0001-00
        </p>
        <p>&copy; 2025 Montoni Tech Soluções. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-container {
  width: 100%;
  background-color: #df58a5;
  color: #fff;
  font-size: 0.85rem;
  text-align: left;
  padding: 0.6rem 0.5rem;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.footer-logo {
  height: 80px; /* logo maior */
  width: auto;
  object-fit: contain;
}

.footer-info p {
  margin: 0;
  line-height: 1.3;
  font-size: inherit;
}

@media (max-width: 600px) {
  .footer-logo {
    height: 80px;
  }
  .footer-container {
    font-size: 0.73rem;
    padding: 0.4rem 0.2rem;
  }
  .footer-content {
    gap: 0.5rem;
  }
}
</style>
