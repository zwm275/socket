import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/test",
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
    {
      path: "/test",
      name: "test",
      component: () => import("../components/test.vue"),
    },
  ],
});

export default router;
