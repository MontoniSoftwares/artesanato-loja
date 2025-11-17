<template>
  <div class="app-wrapper">
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Footer from "./components/Footer.vue";
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
  background: #212838; /* igual ao fundo externo da imagem */
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
