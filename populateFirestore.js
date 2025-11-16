// populateFirestore.js
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQJhkiOyWpEp6aSMn3Z9ZrW0WpfUic1fY",
  authDomain: "mimo-artesanatos.firebaseapp.com",
  projectId: "mimo-artesanatos",
  storageBucket: "mimo-artesanatos.firebasestorage.app",
  messagingSenderId: "314107343774",
  appId: "1:314107343774:web:2509a62b1394a58e855c8f",
  measurementId: "G-ZPZQLTNJWN",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const produtos = [
  {
    nome: "Cestos de Vime",
    descricao: "Cestos artesanais de vime trançado, ideais para decoração.",
    preco: 58.0,
    disponivel: true,
    unico: false,
    foto: "/Cestos.jpg",
  },
  {
    nome: "Descanso de Panela",
    descricao: "Discos trançados coloridos para proteger sua mesa.",
    preco: 22.9,
    disponivel: true,
    unico: false,
    foto: "/Discos.jpg",
  },
  {
    nome: "Vasos Decorativos",
    descricao: "Vasos artesanais, com padrões étnicos e feitos à mão.",
    preco: 112.5,
    disponivel: true,
    unico: true,
    foto: "/Vasos.jpg",
  },
  {
    nome: "Potes Decorativos",
    descricao: "Potes coloridos em palha, perfeitos para pequenos objetos.",
    preco: 37.0,
    disponivel: false,
    unico: false,
    foto: "/Potes.jpg",
  },
  {
    nome: "Cestas Azuis Artesanais",
    descricao:
      "Cestas trançadas em tons de azul, ideais para presentear ou decorar.",
    preco: 44.9,
    disponivel: true,
    unico: true,
    foto: "/Cestas.jpg",
  },
];

async function seedProdutos() {
  try {
    for (let i = 0; i < produtos.length; i++) {
      const p = produtos[i];
      const docRef = doc(collection(db, "produtos"));
      await setDoc(docRef, p);
      console.log(`Produto ${p.nome} salvo com ID ${docRef.id}`);
    }
    console.log("Todos os produtos foram salvos!");
  } catch (error) {
    console.error("Erro ao salvar produtos: ", error);
  }
}

seedProdutos();
