// src/services/api.js
import axios from "axios";

// ✅ Use Kubernetes service name inside cluster
const apiUrl =
  process.env.REACT_APP_BACKEND_URL || "http://backend:8080/api";

const api = axios.create({
  baseURL: apiUrl,
});

export default api;

