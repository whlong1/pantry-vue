import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../store/auth";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Dashboard from "../pages/Dashboard.vue";
import UploadPhoto from "../components/UploadPhoto.vue";
import Pantry from "../components/Pantry.vue";
import Landing from "../components/Landing.vue";
import Recipes from "../components/Recipes.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Public Routes:
    { path: "/", component: Home },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
    // Protected Routes:
    {
      path: "/dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'dashboard', component: Landing },
        { path: "upload", component: UploadPhoto },
        { path: "pantry", component: Pantry },
        { path: "recipes", component: Recipes },
      ],
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
