<template>
  <header>
    <h1 class="text-2xl font-bold mb-4 leading-none">{{ recipe.name }}</h1>
    <p class="mb-4 leading-6">{{ recipe.description }}</p>
  </header>

  <h2 class="text-xl font-bold mb-4">Details</h2>

  <ul class="list-inside mb-4">
    <li class="mb-4 leading-6">
      <b>Difficulty:</b> 
      {{ recipe.difficultyLevel }}
    </li>
    <li class="mb-4 leading-6">
      <b>Estimated Cooking Time:</b>
      {{ recipe.estimatedCookingTimeInMinutes }} minutes
    </li>
  </ul>

  <h2 class="text-xl font-bold mb-2">Ingredients</h2>

  <ul class="list-disc list-inside mb-4">
    <li v-for="ingredient in recipe.ingredients" :key="ingredient" class="mb-2">
      {{ ingredient }}
    </li>
  </ul>

  <h2 class="text-xl font-bold mb-2">Steps</h2>
  <ul class="list-inside mb-4">
    <li v-for="step in recipe.steps" :key="step.step" class="mb-4 leading-6">
      <b>Step {{ step.step }}:</b>
      {{ step.content }}
    </li>
  </ul>
</template>

<script setup>
const props = defineProps(["recipe"]);
</script>