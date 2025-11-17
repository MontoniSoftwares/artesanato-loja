<template>
  <section class="produtos-container">
    <button class="btn-admin" @click="tentarAcessoAdmin">
      <i class="fas fa-lock"></i>
    </button>
    <h1>"Artesanatos"</h1>
    <div class="cards">
      <div v-for="produto in produtos" :key="produto.id" class="card">
        <img :src="produto.foto" :alt="produto.nome" class="card-img" />
        <h3>{{ produto.nome }}</h3>
        <p>{{ produto.descricao }}</p>
        <p class="preco">Preço: R$ {{ produto.preco.toFixed(2) }}</p>
        <p class="disponibilidade">
          Disponível: {{ produto.disponivel ? "Sim" : "Não" }}
        </p>
        <p class="opcoes">
          Opções:
          <span v-if="produto.unico">Peça única</span>
          <span v-else>Cores e tamanhos variados</span>
        </p>
        <button class="btn-comprar" @click="abrirWhatsApp(produto)">
          Quero esse
        </button>
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
  if (senha === "@Matrix") {
    alert("Acesso concedido! Navegando para a área de administração.");
    router.push("/admin");
  } else {
    alert("Senha incorreta!");
  }
}
</script>

<style scoped>
.produtos-container {
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: #fff8fa;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(215, 38, 96, 0.15);
}

h1 {
  text-align: center;
  margin-bottom: 2.5rem;
  color: #d72660;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-shadow: 1px 1px 3px rgba(215, 38, 96, 0.3);
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
  border: 1px solid #e1cbd7;
  border-radius: 18px;
  padding: 1.5rem 1.2rem 2.2rem 1.2rem;
  background: #fff0f6;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  box-shadow: 0 4px 12px rgba(238, 201, 210, 0.8);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.card:hover {
  transform: translateY(-6px) scale(1.04);
  box-shadow: 0 8px 20px rgba(215, 38, 96, 0.4);
}

.card-img {
  width: 260px;
  height: 260px;
  border-radius: 18px;
  margin-bottom: 1.3rem;
  object-fit: cover;
  box-shadow: 0 4px 14px rgba(222, 194, 215, 0.6);
  transition: box-shadow 0.3s ease;
}

.card-img:hover {
  box-shadow: 0 6px 18px rgba(215, 38, 96, 0.6);
}

h3 {
  font-weight: 700;
  color: #8b194b;
  margin-bottom: 0.4rem;
  letter-spacing: 0.03em;
}

p {
  color: #5c2a3d;
  font-weight: 500;
  margin: 0.3rem 0;
  line-height: 1.3;
}

.preco {
  font-size: 1.1rem;
  font-weight: 700;
  color: #d72660;
  margin-top: 0.6rem;
}

.disponibilidade {
  font-style: italic;
  margin-bottom: 0.6rem;
}

.opcoes span {
  font-weight: 600;
  color: #a63556;
}

button {
  background: #d72660;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 0.9rem 2.5rem;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
  letter-spacing: 0.08em;
  margin-top: 1.5rem;
  transition: background 0.3s ease;
  box-shadow: 0 4px 10px rgba(215, 38, 96, 0.5);
}

button:hover {
  background: #ad1850;
  box-shadow: 0 6px 14px rgba(173, 24, 80, 0.8);
}

.btn-admin {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: #d72660;
  color: #fff;
  border: none;
  border-radius: 22px;
  padding: 0.7rem 1rem;
  font-weight: 700;
  font-size: 0.5rem;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 3px 10px rgba(230, 0, 70, 0.8);
  transition: background 0.25s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-admin i {
  font-size: 1.2rem;
}

.btn-admin:hover {
  background: #ad1850;
}

@media (max-width: 600px) {
  .btn-admin {
    position: static;
    display: block;
    margin: 0 0 1.5rem auto;
    box-shadow: none;
  }
}
</style>
