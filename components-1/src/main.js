import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import "bootstrap/dist/css/bootstrap.min.css";
// import './assets/main.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
    },
    {},
  ],
});

createApp(App).use(router).mount("#app");
