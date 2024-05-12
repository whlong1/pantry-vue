const BASE_URL = `${import.meta.env.VITE_SERVERLESS_URL}`;
import * as tokenService from "./tokenService";

const createFood = async (imageUrl) => {
  const token = tokenService.getToken();
  const res = await fetch(`${BASE_URL}/food`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageUrl: imageUrl }),
  });
  const data = await res.json();
  return data;
};

const getUserFoodItems = async () => {
  const token = tokenService.getToken();
  try {
    const res = await fetch(`${BASE_URL}/food/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

export { createFood, getUserFoodItems };
