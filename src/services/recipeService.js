const BASE_URL = `${import.meta.env.VITE_SERVERLESS_URL}`;
import * as tokenService from "./tokenService";

const createRecipe = async (recipeCategory) => {
  try {
    const token = tokenService.getToken();
    const res = await fetch(`${BASE_URL}/recipes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipeCategory: recipeCategory }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { createRecipe };
