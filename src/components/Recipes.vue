<template>
  <header v-if="!recipe && !isLoading">
    <h1 class="text-2xl font-bold mb-4 leading-none text-gray-900">Generate Recipe</h1>
    <p class="font-medium text-gray-800 mt-0">
      {{ !recipeCategory ? "Select a recipe category" : `Generate ${recipeCategory} recipe?` }}
    </p>
  </header>
  <section v-if="!recipe">
    <div v-if="!recipeCategory" class="flex flex-row w-full">
      <button @click="setRecipeCategory('Breakfast')" class="m-0 mr-2 text-center w-auto text-white bg-orange-500 hover:bg-orange-600 rounded-sm text-sm px-6 py-2 mt-4 font-bold box-border">
        Breakfast
      </button>
      <button @click="setRecipeCategory('Lunch')" class="m-0 mr-2 text-center w-auto text-white  bg-green-500 hover:bg-green-600 rounded-sm text-sm px-6 py-2 mt-4 font-bold box-border">
        Lunch
      </button>
      <button @click="setRecipeCategory('Dinner')" class="m-0 mr-2 text-center w-auto text-white bg-rose-500 hover:bg-rose-600 rounded-sm text-sm px-6 py-2 mt-4 font-bold box-border">
        Dinner
      </button>
    </div>
    <div v-if="recipeCategory && !isLoading" class="flex flex-col">
      <button @click="handleSubmit" :disabled="!recipeCategory" class="text-white bg-blue-500 hover:bg-blue-600 rounded-sm text-sm px-6 py-2 mt-4 font-bold box-border">
        Submit
      </button>
      <button @click="setRecipeCategory(null)" :disabled="!recipeCategory" class="text-white bg-red-500 hover:bg-red-600 rounded-sm text-sm px-6 py-2 mt-4 font-bold box-border">
        Cancel
      </button>
    </div>
  </section>

  <div v-if="isLoading" class="p-2 h-60 min-h-60 ml-1 w-full m-0 flex justify-center items-center">
    <p class="text-1xl font-bold mb-4 leading-none text-gray-900">Loading</p>
  </div>

  <section v-if="recipe && !isLoading" class="text-gray-800">
    <SingleRecipe :recipe="recipe" />
    <button @click="handleReset" class="text-white bg-red-500 hover:bg-red-600 rounded-sm text-sm px-6 py-2 mt-4 font-bold box-border">
      Reset
    </button>
  </section>

</template>

<script setup>
import { ref } from 'vue';
import * as recipeService from "../services/recipeService"
import SingleRecipe from "./SingleRecipe.vue";

const isLoading = ref(false);
const recipeCategory = ref(null);
const recipe = ref(null)

const setRecipeCategory = (meal) => {
  recipeCategory.value = meal;
}

const handleReset = () => {
  recipe.value = null
  recipeCategory.value = null;
}

const handleSubmit = async () => {
  if (!recipeCategory.value) return;

  try {
    isLoading.value = true;
    const recipeData = await recipeService.createRecipe(recipeCategory.value);
    recipeCategory.value = null;
    isLoading.value = false;
    recipe.value = recipeData;
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>
