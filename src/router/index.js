import { onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/init";
import Admin from "../views/Admin.vue";
import LoginAdmin from "../views/LoginAdmin.vue";
import Produtos from "../views/Produtos.vue";

// Defina as rotas
const routes = [
  { path: "/", redirect: "/produtos" },
  { path: "/login", component: LoginAdmin },
  {
    path: "/admin",
    component: Admin,
    meta: { requiresAuth: true },
  },
  {
    path: "/produtos",
    component: Produtos,
  },
];

// Criar roteador
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Função que retorna uma promise para aguardar o estado do usuário autenticado
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}

// Guard para checar autenticação com await na promise
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const user = await getCurrentUser();
      if (user) {
        next();
      } else {
        next("/login");
      }
    } catch (error) {
      console.error("Erro na verificação de autenticação:", error);
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
