<template>
  <tr class="">
    <td class="border-gray-700	 border-b overflow-hidden py-2 whitespace-nowrap text-ellipsis pr-12">{{ food.name }}</td>

    <td class="border-gray-700	 border-b overflow-hidden py-2">{{ food.estimatedCaloriesPerServing }} grams</td>
    <td class="border-gray-700	 border-b overflow-hidden py-2">{{ food.estimatedFatGramsPerServing }} grams</td>
    <td class="border-gray-700	 border-b overflow-hidden py-2">{{ food.estimatedCarbGramsPerServing }} grams</td>
    <td class="border-gray-700	 border-b overflow-hidden py-2">{{ food.estimatedProteinGramsPerServing }} grams</td>
    <td class="border-gray-700	 border-b overflow-hidden py-2">{{ food.estimatedServingSizeInGrams }} grams</td>

    <td class="border-gray-700	 border-b overflow-hidden py-2 whitespace-nowrap text-ellipsis">{{ food.possibleAllergens.join(', ') }}</td>
  </tr>
</template>
<script setup>
const { food } = defineProps({ food: Object })
</script>
