<template>
  <section class="produtos-container">
    <button class="btn-admin" @click="tentarAcessoAdmin">Admin</button>
    <h1>Produtos</h1>
    <div class="cards">
      <div v-for="produto in produtos" :key="produto.id" class="card">
        <img :src="produto.foto" :alt="produto.nome" class="card-img" />
        <h3>{{ produto.nome }}</h3>
        <p>{{ produto.descricao }}</p>
        <p>Preço: R$ {{ produto.preco.toFixed(2) }}</p>
        <p>Disponível: {{ produto.disponivel ? "Sim" : "Não" }}</p>
        <p>
          Opções:
          <span v-if="produto.unico">Peça única</span>
          <span v-else>Cores e tamanhos variados</span>
        </p>
        <button @click="abrirWhatsApp(produto)">Quero esse</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { collection, getDocs } from "firebase/firestore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import db from "../firebase/init";

const router = useRouter();
const produtos = ref([]);

async function carregarProdutos() {
  const produtosCollection = collection(db, "produtos");
  const produtosSnapshot = await getDocs(produtosCollection);
  produtos.value = produtosSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

onMounted(() => {
  carregarProdutos();
});

function abrirWhatsApp(produto) {
  const numeroLoja = "5522999998352";
  const texto = `Olá! Tenho interesse no produto: ${produto.nome}. Poderia me dar mais informações?`;
  const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
}

function tentarAcessoAdmin() {
  const senha = window.prompt("Digite a senha de admin:");
  if (senha === "123") {
    router.push("/admin");
  } else {
    alert("Senha incorreta!");
  }
}
</script>

<style scoped>
.produtos-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #d72660;
}
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  justify-items: center;
}
@media (max-width: 1200px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
.card {
  border: 1px solid #ddd;
  border-radius: 14px;
  padding: 1.2rem 1rem 2rem 1rem;
  background: #fff0f6;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 260px;
  box-shadow: 0 2px 14px #eec9d2;
  transition: transform 0.13s;
}
.card:hover {
  transform: translateY(-4px) scale(1.02);
}
.card-img {
  width: 250px;
  height: 250px;
  border-radius: 14px;
  margin-bottom: 1.2rem;
  object-fit: cover;
  box-shadow: 0 2px 10px #dec2d7;
}
button {
  background: #d72660;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 0.8rem 2rem;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.08rem;
  letter-spacing: 0.06em;
  margin-top: 1.3rem;
  transition: background 0.25s;
}
button:hover {
  background: #ad1850;
}
.btn-admin {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: #d72660;
  color: #fff;
  border: none;
  border-radius: 18px;
  padding: 0.65rem 1.25rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px #eec9d2;
  transition: background 0.18s;
}
.btn-admin:hover {
  background: #ad1850;
}
</style>
