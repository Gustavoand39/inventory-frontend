// src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_APIEND,
});

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
