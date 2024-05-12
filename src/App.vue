<script setup>
import { onMounted } from 'vue';
import { getToken } from './services/tokenService';
import { auth } from './store/auth';

onMounted(() => {
  const token = getToken();
  if (token) {
    auth.login(token);
  }
});
</script>

<template>
  {{auth.isAuthenticated}}
  <div class="flex flex-col h-full">
    <nav class="flex-none w-full p-4 text-sm font-medium items-center justify-between border-b border-gray-700">
      <router-link to="/">Home</router-link>
      <!-- Public Links -->
      <template v-if="!auth.isAuthenticated">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </template>
      <!-- Protected Links -->
      <template v-if="auth.isAuthenticated">
        <router-link to="/dashboard">Dashboard</router-link>
        <button @click="auth.logout()">Logout</button>
      </template>
    </nav>

    <main class="p-4">
      <router-view></router-view>
    </main>

    <footer class="flex-none p-4 border-t border-gray-700">
      Footer
    </footer>
  </div>
</template>