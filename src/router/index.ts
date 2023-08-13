import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../components/main.vue"),
      children: [
        {
          path: "chat",
          component: () => import("@/views/chatView.vue"),
        },
        {
          path: "person",
          component: () => import("@/views/personView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/login.vue"),
    },
  ],
});

export default router;
