import { reactive } from 'vue';
import * as foodService from '../services/foodService';

export const pantry = reactive({
  foodItems: [],
  async setInitialPantry() {
    const foodItemData = await foodService.getUserFoodItems();
    this.foodItems = foodItemData;
  }
});