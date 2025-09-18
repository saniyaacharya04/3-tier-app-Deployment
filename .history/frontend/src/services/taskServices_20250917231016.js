import axios from "axios";

// ✅ Use local backend URL for development
const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/api/tasks";

function getUserId() {
  return localStorage.getItem("user_id");
}

export function getTasks() {
  const user_id = getUserId();
  return axios.get(apiUrl, { params: { user_id } });
}

export function addTask(task) {
  const user_id = getUserId();
  const payload = {
    user_id,
    title: task.title,
    description: task.description || task.title,
    status: task.status || "pending",
  };
  return axios.post(apiUrl, payload);
}

export function updateTask(id, task) {
  const user_id = getUserId();
  const payload = {
    user_id,
    title: task.title,
    description: task.description || task.title,
    status: task.status,
  };
  return axios.put(`${apiUrl}/${id}`, payload);
}

export function deleteTask(id) {
  const user_id = getUserId();
  return axios.delete(`${apiUrl}/${id}`, { data: { user_id } });
}
