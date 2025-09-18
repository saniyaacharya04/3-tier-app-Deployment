// src/services/authServices.js
import api from "./api";

export function loginUser(credentials) {
  return api.post("/users/login", credentials);
}

export function registerUser(userData) {
  return api.post("/users/register", userData);
}
