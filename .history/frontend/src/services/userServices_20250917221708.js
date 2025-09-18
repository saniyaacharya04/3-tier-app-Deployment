import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8081/api";

export function registerUser(user) {
  return axios.post(`${apiUrl}/users/register`, user);
}

export function loginUser(user) {
  return axios.post(`${apiUrl}/users/login`, user);
}
