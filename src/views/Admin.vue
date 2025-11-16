<template>
  <section class="admin-container">
    <button class="btn-sair" @click="sair">Sair</button>
    <h1>Gerenciar Produtos</h1>

    <form @submit.prevent="salvarProduto">
      <input v-model="novoProduto.nome" placeholder="Nome" required />
      <input v-model="novoProduto.descricao" placeholder="Descrição" required />
      <input
        v-model.number="novoProduto.preco"
        type="number"
        step="0.01"
        placeholder="Preço"
        required
      />

      <input type="file" accept="image/*" @change="onFileChange" />

      <label>
        <input type="checkbox" v-model="novoProduto.disponivel" />
        Disponível
      </label>
      <label>
        <input type="checkbox" v-model="novoProduto.unico" />
        Peça única
      </label>

      <button type="submit">Salvar Produto</button>
    </form>

    <div class="lista-produtos">
      <div class="produto" v-for="produto in produtos" :key="produto.id">
        <p>
          <strong>{{ produto.nome }}</strong> - R$
          {{ produto.preco.toFixed(2) }}
        </p>
        <img
          :src="produto.foto"
          alt=""
          style="max-width: 100px; border-radius: 8px; margin-right: 8px"
        />
        <button @click="deletarProduto(produto.id)">Excluir</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import db from "../firebase/init";

const API_KEY_IMGBB = "c84a5731b24f82f3da759d1f73e1c3f1";

const router = useRouter();

const produtos = ref([]);
const novoProduto = ref({
  nome: "",
  descricao: "",
  preco: 0,
  foto: "",
  disponivel: true,
  unico: false,
});

let selectedFile = null;

const produtosCollection = collection(db, "produtos");

function onFileChange(event) {
  selectedFile = event.target.files[0];
}

async function uploadImageToImgBB(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${API_KEY_IMGBB}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();
  if (result.success) {
    return result.data.url;
  } else {
    throw new Error("Falha no upload da imagem");
  }
}

async function carregarProdutos() {
  const produtosSnapshot = await getDocs(produtosCollection);
  produtos.value = produtosSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

async function salvarProduto() {
  try {
    if (selectedFile) {
      const url = await uploadImageToImgBB(selectedFile);
      novoProduto.value.foto = url;
    }
    await addDoc(produtosCollection, novoProduto.value);
    novoProduto.value = {
      nome: "",
      descricao: "",
      preco: 0,
      foto: "",
      disponivel: true,
      unico: false,
    };
    selectedFile = null;
    carregarProdutos();
  } catch (error) {
    alert("Erro ao salvar produto: " + error.message);
  }
}

async function deletarProduto(id) {
  await deleteDoc(doc(db, "produtos", id));
  carregarProdutos();
}

function sair() {
  router.push("/produtos");
}

onMounted(() => {
  carregarProdutos();
});
</script>

<style scoped>
.admin-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff0f6;
  position: relative;
}
form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 2rem;
}
input[type="text"],
input[type="number"] {
  padding: 0.5rem;
  font-size: 1rem;
}
button {
  width: 140px;
  padding: 0.6rem;
  background: #d72660;
  color: white;
  border: none;
  border-radius: 22px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #ad1850;
}
.lista-produtos {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.produto {
  background: white;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: 0 2px 10px #eec9d2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn-sair {
  background: #555;
  color: white;
  border: none;
  border-radius: 18px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-weight: 600;
  transition: background 0.2s;
}
.btn-sair:hover {
  background: #333;
}
</style>
