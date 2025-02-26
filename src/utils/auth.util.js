import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  try {

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
