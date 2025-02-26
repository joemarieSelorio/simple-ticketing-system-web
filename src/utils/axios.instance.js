import axios from "axios";
import { getToken, isTokenValid, removeToken } from "../utils/auth.util";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});


axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token && isTokenValid()) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      removeToken(); 
      window.location.href = "/login";
    }
    return config;
  },
  (error) => Promise.reject(error.response || error.message)
);

export default axiosInstance;
