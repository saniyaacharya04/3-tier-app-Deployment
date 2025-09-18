import api from "./api";

export function loginUser(credentials) {
  return api.post("/users/login", credentials);
}

export function registerUser(userData) {
  return api.post("/users/register", userData);
}

// Add a function to get protected user data
export function getProfile(token) {
  return api.get("/users/profile", { headers: { Authorization: `Bearer ${token}` } });
}
