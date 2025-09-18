import axios from "axios";

// Use REACT_APP_BACKEND_URL if defined, else default to localhost port-forward
const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8081/api/tasks";

console.log("Backend API URL:", apiUrl);

export function getTasks() {
    return axios.get(apiUrl);
}

export function addTask(task) {
    return axios.post(apiUrl, task);
}

export function updateTask(id, task) {
    return axios.put(`${apiUrl}/${id}`, task);
}

export function deleteTask(id) {
    return axios.delete(`${apiUrl}/${id}`);
}
