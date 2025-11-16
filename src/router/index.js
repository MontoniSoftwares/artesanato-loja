import { createRouter, createWebHistory } from "vue-router";
import Admin from "../views/Admin.vue";
import Home from "../views/Home.vue";
import Produtos from "../views/Produtos.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/produtos", name: "Produtos", component: Produtos },
  { path: "/admin", name: "Admin", component: Admin },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
