// src/firebase/init.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQJhkiOyWpEp6aSMn3Z9ZrW0WpfUic1fY",
  authDomain: "mimo-artesanatos.firebaseapp.com",
  projectId: "mimo-artesanatos",
  storageBucket: "mimo-artesanatos.firebasestorage.app",
  messagingSenderId: "314107343774",
  appId: "1:314107343774:web:2509a62b1394a58e855c8f",
  measurementId: "G-ZPZQLTNJWN",
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(firebaseApp);

export default db;
