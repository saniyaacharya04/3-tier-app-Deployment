// src/services/taskServices.js
import api from "./api";

function getUserId() {
  return localStorage.getItem("user_id");
}

export function getTasks() {
  const user_id = getUserId();
  return api.get("/tasks", { params: { user_id } });
}

export function addTask(task) {
  const user_id = getUserId();
  const payload = {
    user_id,
    title: task.title,
    description: task.description || task.title,
    status: task.status || "pending",
  };
  return api.post("/tasks", payload);
}

export function updateTask(id, task) {
  const user_id = getUserId();
  const payload = {
    user_id,
    title: task.title,
    description: task.description || task.title,
    status: task.status,
  };
  return api.put(`/tasks/${id}`, payload);
}

export function deleteTask(id) {
  const user_id = getUserId();
  return api.delete(`/tasks/${id}`, { data: { user_id } });
}
