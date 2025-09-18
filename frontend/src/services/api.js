import axios from "axios";

// Use environment variable for base URL
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// Optional: helper endpoints
export const userApi = axios.create({
  baseURL: `${BASE_URL}/users`,
});

export const taskApi = axios.create({
  baseURL: `${BASE_URL}/tasks`,
});

export default api;
