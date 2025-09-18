// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // <-- use localhost for local dev
});

export default api;
