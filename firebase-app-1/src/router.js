import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("./views/Home.vue");
const Login = () => import("./views/Login.vue");
const Register = () => import("./views/Register.vue");

const routes = [
  { path: "/", component: Home },
  { path: "/", component: Login },
  { path: "/", component: Register },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
