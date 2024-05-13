<template>
  <tr class="border-gray-200 border-b text-xs font-regular">
    <td class="border-b overflow-hidden py-2 font-medium w-48">{{ truncatedFoodName }}</td>
    <td class="border-b overflow-hidden py-2 text-left">{{ food.estimatedCaloriesPerServing }} calories</td>
    <td class="border-b overflow-hidden py-2 text-left">{{ food.estimatedFatGramsPerServing }} grams</td>
    <td class="border-b overflow-hidden py-2 text-left">{{ food.estimatedCarbGramsPerServing }} grams</td>
    <td class="border-b overflow-hidden py-2 text-left">{{ food.estimatedProteinGramsPerServing }} grams</td>
    <td class="border-b overflow-hidden py-2 text-left">{{ food.estimatedServingSizeInGrams }} grams</td>
    <td class="border-b overflow-hidden py-2 text-left" :title="food.possibleAllergens.join(', ')">
      {{ food.possibleAllergens.length ? food.possibleAllergens[0] : "None" }}
    </td>
  </tr>
</template>
<script setup>
const { food, index } = defineProps(["food", "index"]);
const truncatedFoodName = food.name.length > 36 ? food.name.substring(0, 34) + '...' : food.name;
</script>
