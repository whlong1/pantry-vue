<template>
  <h2>Pantry</h2>
  <li v-for="food in pantry.foodItems">
    {{ food.name }}
  </li>
</template>

<script setup>
import { pantry } from "../store/pantry.js"
</script>
