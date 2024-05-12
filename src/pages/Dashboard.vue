<template>
  <div class="flex flex-row h-full">
    <nav class="w-[12rem] h-full border-r border-gray-200 p-4 text-gray-800 overflow-y-auto">
      <h1 class="font-bold text-sm">Dashboard</h1>
      <ul class="flex flex-col p-0 pt-4 text-xs font-medium">
        <li class="hover:underline mb-4">
          <router-link to="/dashboard/upload">Upload</router-link>
        </li>
        <li class="hover:underline mb-4">
          <router-link to="/dashboard/pantry">My Pantry</router-link>
        </li>
        <li class="hover:underline mb-4">
          <router-link to="/dashboard/recipes">Generate Recipe</router-link>
        </li>
      </ul>
    </nav>
    <section class="flex flex-col w-full p-4 overflow-y-auto">
      <router-view></router-view>
    </section>
  </div>
</template>

<script setup>
</script>
