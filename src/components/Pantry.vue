<template>
  <h2 class="text-2xl font-bold mb-4">Pantry</h2>
  <table class="w-full table-fixed">
    <thead>
      <tr class="border-gray-700 border-b">
        <th scope="col" class="text-left py-2 w-64">Name</th>
        <th scope="col" class="text-left py-2 w-auto">Calories</th>
        <th scope="col" class="text-left py-2 w-auto">Fat</th>
        <th scope="col" class="text-left py-2 w-auto">Carbs</th>
        <th scope="col" class="text-left py-2 w-auto">Protein</th>
        <th scope="col" class="text-left py-2 w-auto">Serving Size</th>
        <th scope="col" class="text-left py-2 w-auto">Allergens</th>
      </tr>
    </thead>
    <tbody>
      <FoodRow v-for="food in pantry.foodItems" :key="food.id" :food="food" />
    </tbody>
  </table>
</template>

<script setup>
import { pantry } from "../store/pantry.js"
import FoodRow from "./FoodRow.vue";
</script>
