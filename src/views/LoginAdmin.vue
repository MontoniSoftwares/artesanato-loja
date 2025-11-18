<template>
  <section class="login-container">
    <h1>Login Admin</h1>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="senha" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <p v-if="erro" class="error">{{ erro }}</p>
  </section>
</template>

<script setup>
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase/init";

const email = ref("");
const senha = ref("");
const erro = ref(null);
const router = useRouter();

async function login() {
  erro.value = null;
  try {
    await signInWithEmailAndPassword(auth, email.value, senha.value);
    router.push("/admin");
  } catch (e) {
    erro.value = "Erro no login: " + e.message;
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: #fff0f6;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(215, 38, 96, 0.2);
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin: 1rem 0;
  padding: 0.6rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}
button {
  background: #d72660;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  padding: 0.8rem 2rem;
  font-size: 1.1rem;
}
button:hover {
  background: #ad1850;
}
.error {
  color: #c00;
  margin-top: 1rem;
}
</style>
