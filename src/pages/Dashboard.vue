<template>
  <div class="flex flex-row">
    <nav class="flex flex-col border-r border-gray-700">
      <h1>Dashboard</h1>
      <router-link to="/dashboard/upload">Upload</router-link>
      <router-link to="/dashboard/pantry">Pantry</router-link>
      <router-link to="/dashboard/recipes">Recipes</router-link>
    </nav>
    <section class="flex flex-col">
      <router-view></router-view>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { getToken } from '../services/tokenService';
import { pantry } from '../store/pantry';
onMounted(() => {
  const token = getToken();
  if (token) {
    pantry.setInitialPantry();
  }
});
</script>
