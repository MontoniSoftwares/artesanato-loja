import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/init";
import Admin from "../pages/Admin.vue";
import LoginAdmin from "../pages/LoginAdmin.vue";
import Produtos from "../pages/Produtos.vue";

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

// Guard para checar autenticação
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const user = auth.currentUser;

  if (requiresAuth && !user) {
    next("/login");
  } else {
    next();
  }
});

export default router;
