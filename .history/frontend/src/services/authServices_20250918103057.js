// src/services/authServices.js
import api from "./api";

export function registerUser(userData) {
  return api.post("/auth/register", userData);
}

export function loginUser(credentials) {
  return api.post("/auth/login", credentials);
}
