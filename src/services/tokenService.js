import { jwtDecode } from "jwt-decode";

export function getToken() {
  let token = localStorage.getItem('token');
  if (token) {
    const payload = jwtDecode(token);
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      token = null;
    }
  }
  return token;
};

export function getUserFromToken() {
  const token = getToken();
  return token ? jwtDecode(token).user : null;
};

// React reference:
// https://github.com/whlong1/hoot-client/blob/main/src/services/tokenService.js