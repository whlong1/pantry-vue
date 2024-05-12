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
  <div class="flex flex-col h-full">
    <nav class="border-b border-gray-200 p-4 text-gray-800">
      <ul class="flex flex-row items-center p-0 text-sm leading-none font-medium	">
        <li class="m-0 mr-4">
          <img class="w-8" src="./assets/logo.svg" alt="App logo">
        </li>
        <li class="m-0 hover:underline mr-4">
          <router-link to="/">Home</router-link>
        </li>
        <!-- Public Links -->
        <template v-if="!auth.isAuthenticated">
          <li class="m-0 hover:underline mr-4">
            <router-link to="/login">Login</router-link>
          </li>
          <li class="m-0 hover:underline">
            <router-link to="/register">Register</router-link>
          </li>
        </template>
        <!-- Protected Links -->
        <template v-if="auth.isAuthenticated">
          <li class="m-0 hover:underline mr-4">
            <router-link to="/dashboard">Dashboard</router-link>
          </li>
          <li class="m-0 hover:underline ml-auto">
            <button @click="auth.logout()">Logout</button>
          </li>
        </template>

      </ul>
    </nav>

    <main>
      <router-view></router-view>
    </main>

    <footer class="flex justify-center items-center p-2 border-t border-gray-200">
      <p class="text-xs text-gray-600">
        © 2024 Pantry. All rights reserved
      </p>
    </footer>
  </div>
</template>