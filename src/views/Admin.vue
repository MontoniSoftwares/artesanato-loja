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

      <button type="submit">
        {{ editando ? "Atualizar Produto" : "Salvar Produto" }}
      </button>
      <button v-if="editando" type="button" @click="cancelarEdicao">
        Cancelar
      </button>
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
        <button @click="editarProdutoBtn(produto)">Editar</button>
        <button @click="deletarProduto(produto.id)">Excluir</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { auth, db } from "../firebase/init";

const API_KEY_IMGBB = "c84a5731b24f82f3da759d1f73e1c3f1";

const router = useRouter();

const produtos = ref([]);
const novoProduto = ref({
  id: null,
  nome: "",
  descricao: "",
  preco: 0,
  foto: "",
  disponivel: true,
  unico: false,
});
const editando = ref(false);
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

function editarProdutoBtn(produto) {
  novoProduto.value = { ...produto };
  editando.value = true;
  selectedFile = null;
}

async function salvarProduto() {
  try {
    novoProduto.value.nome = novoProduto.value.nome.trim();
    novoProduto.value.descricao = novoProduto.value.descricao.trim();

    if (novoProduto.value.nome.toLowerCase() === "porta absorbente") {
      novoProduto.value.nome = "Porta Absorvente";
    }

    if (selectedFile) {
      const url = await uploadImageToImgBB(selectedFile);
      novoProduto.value.foto = url;
    } else if (editando.value) {
      const produtoAtual = produtos.value.find(
        (p) => p.id === novoProduto.value.id
      );
      novoProduto.value.foto = produtoAtual?.foto || "";
    }

    const { id, ...data } = novoProduto.value;

    if (editando.value) {
      const produtoRef = doc(db, "produtos", novoProduto.value.id);
      await updateDoc(produtoRef, data);
      alert("Produto atualizado com sucesso!");
    } else {
      delete novoProduto.value.id;
      await addDoc(produtosCollection, data);
      alert("Produto criado com sucesso!");
    }

    cancelarEdicao();
    carregarProdutos();
  } catch (error) {
    alert("Erro ao salvar produto: " + error.message);
  }
}

function cancelarEdicao() {
  editando.value = false;
  novoProduto.value = {
    id: null,
    nome: "",
    descricao: "",
    preco: 0,
    foto: "",
    disponivel: true,
    unico: false,
  };
  selectedFile = null;
}

async function deletarProduto(id) {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    await deleteDoc(doc(db, "produtos", id));
    carregarProdutos();
  }
}

async function sair() {
  try {
    await signOut(auth);
    alert("Logout realizado com sucesso!");
    router.push("/login");
  } catch (error) {
    alert("Erro ao fazer logout: " + error.message);
  }
}

onMounted(() => {
  carregarProdutos();
});
</script>

<style scoped>
.admin-container {
  max-width: 700px;
  width: 100%;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff0f6;
  position: relative;
  box-sizing: border-box;
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
  width: 120px;
  padding: 0.6rem;
  background: #d72660;
  color: white;
  border: none;
  border-radius: 22px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  margin-right: 0.4rem;
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
  width: 65px;
  padding: 0.6rem;
  background: #af3065;
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
