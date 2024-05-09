import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../store/auth";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Public Routes:
    { path: "/", component: Home },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
    // Protected Routes:
    {
      path: "/profile",
      component: Profile,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;