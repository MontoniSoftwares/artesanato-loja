<template>
  <footer class="footer-container">
    <img src="/logo-ms.png" alt="Montoni Tech Logo" class="footer-logo" />
    <div class="footer-info">
      <p>
        Montoni Tech Soluções Inova Simples (I.s.) - CNPJ: 62.553.238/0001-00
      </p>
      <p>&copy; 2025 Montoni Tech Soluções. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer-container {
  background-color: #df58a5;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  color: #f4f4f4;
}

.footer-logo {
  height: 120px;
  object-fit: contain;
}

.footer-info p {
  margin: 0;
  line-height: 1.3;
}
</style>
