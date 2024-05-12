import { reactive } from 'vue';
import router from '../router';
import * as foodService from '../services/foodService';

export const pantry = reactive({
  foodItems: [],
  async setInitialPantry() {
    const foodItemData = await foodService.getUserFoodItems();
    this.foodItems = foodItemData;
  }
});