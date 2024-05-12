<template>
  <h1 class="text-2xl font-bold mb-4 leading-none text-gray-900">My Pantry</h1>
  <table class="w-full table-fixed">
    <thead class="text-gray-800">
      <tr class="border-gray-200 border-b text-xs font-semibold">
        <th scope="col" class="text-left py-2 w-56 pr-6">Name</th>
        <th scope="col" class="text-left py-2 w-auto">Calories</th>
        <th scope="col" class="text-left py-2 w-auto">Fat</th>
        <th scope="col" class="text-left py-2 w-auto">Carbs</th>
        <th scope="col" class="text-left py-2 w-auto">Protein</th>
        <th scope="col" class="text-left py-2 w-auto">Serving Size</th>
        <th scope="col" class="text-left py-2 w-auto">Allergens</th>
      </tr>
    </thead>
    <tbody class="text-gray-800">
      <FoodRow v-for="(food, index) in pantry.foodItems" :key="food.id" :food="food" :index="index" />
    </tbody>
  </table>
</template>

<script setup>
import FoodRow from "./FoodRow.vue";
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
