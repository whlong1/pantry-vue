<template>
  <h1>Dashboard</h1>
  <nav>
    <router-link to="/dashboard/upload">Upload</router-link>
    <router-link to="/dashboard/pantry">Pantry</router-link>
  </nav>
  <router-view></router-view>
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
