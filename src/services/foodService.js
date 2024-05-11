const BASE_URL = `${import.meta.env.VITE_SERVERLESS_URL}/food`;
import * as tokenService from "./tokenService";

const createFood = async (imageUrl) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });
    return await res.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

const getUserFoodItems = async () => {
  try {
    const res = await fetch(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${tokenService.getToken()}` },
    });
    return await res.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

export { createFood, getUserFoodItems };
