import { jwtDecode } from "jwt-decode";

export function getToken() {
  let token = localStorage.getItem("token");
  if (token) {
    try {
      const payload = jwtDecode(token);
      if (payload.exp < Date.now() / 1000) {
        console.log("Token expired and removed.");
        localStorage.removeItem("token");
        token = null;
      }
    } catch (error) {
      console.log("Failed to decode token:", error);
      localStorage.removeItem("token");
      token = null;
    }
  }
  return token;
}

export function getUserFromToken() {
  const token = getToken();
  return token ? jwtDecode(token).user : null;
}

// Adapted from my React JWT Auth build:
// https://github.com/whlong1/hoot-client/blob/main/src/services/tokenService.js
