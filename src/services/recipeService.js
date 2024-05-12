const BASE_URL = `${import.meta.env.VITE_SERVERLESS_URL}`;
import * as tokenService from "./tokenService";

const generateRecipe = async (prompt) => {
  const token = tokenService.getToken();
  const res = await fetch(`${BASE_URL}/recipes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
  });
  const data = await res.json();
  return data;
};

export { generateRecipe };
