// 路由鉴权 路由能不能被访问
import router from "./index";
// 全局路由守卫
// 前置
router.beforeEach((to: any, from: any, next: any) => {
  if (to.path === "/login") {
    next({ path: "/login/signin" });
  }
  next();
});
// 后置
router.afterEach((to: any, from: any) => {});
