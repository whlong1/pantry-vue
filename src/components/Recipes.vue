<template>
  <h2 class="text-2xl font-bold mb-4">Recipes</h2>
  <section>
    <button @click="setPrompt('Breakfast')">Breakfast</button>
    <button @click="setPrompt('Lunch')">Lunch</button>
    <button @click="setPrompt('Dinner')">Dinner</button>

    <button @click="handleSubmit" :disabled="!prompt">
      Submit
    </button>

  </section>
</template>

<script setup>
import { ref } from 'vue';
import * as recipeService from "../services/recipeService"

const isLoading = ref(false);
const prompt = ref(null);
const recipeState = ref(null)

function setPrompt(meal) {
  prompt.value = meal;
}

const handleSubmit = async () => {
  if (!prompt.value) return;

  try {
    isLoading.value = true;
    const recipeData = await recipeService.generateRecipe(prompt.value);

    prompt.value = null;
    isLoading.value = false;
    recipeState.value = recipeData;
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>
