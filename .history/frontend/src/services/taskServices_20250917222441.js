import axios from "axios";

// Base API URL (use env var if available)
const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8081/api/tasks";

// Get user_id from localStorage (set after login)
function getUserId() {
  return localStorage.getItem("user_id");
}

// ✅ Fetch all tasks for current user
export function getTasks() {
  const user_id = getUserId();
  return axios.get(apiUrl, { params: { user_id } });
}

// ✅ Add a new task
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

// ✅ Update an existing task
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

// ✅ Delete a task
export function deleteTask(id) {
  const user_id = getUserId();
  return axios.delete(`${apiUrl}/${id}`, { data: { user_id } });
}
x