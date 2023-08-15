import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login/signin",
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../components/main.vue"),
      children: [
        {
          path: "chat",
          component: () => import("../views/chatView.vue"),
          children: [
            {
              path: "detail",
              component: () => import("../views/chatDetailView.vue"),
            },
          ],
        },
        {
          path: "person",
          component: () => import("../views/personView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/login.vue"),
      children: [
        {
          path: "signin",
          component: () => import("../views/login/signIn.vue"),
        },
        {
          path: "signup",
          component: () => import("../views/login/signUp.vue"),
        },
      ],
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../components/test.vue"),
    },
  ],
});

export default router;
