import axios from "axios";

// Use REACT_APP_BACKEND_URL if defined, else default to localhost port-forward
const apiUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8081/api/tasks";

console.log("Backend API URL:", apiUrl);

export function getTasks() {
    return axios.get(apiUrl);
}

// Updated addTask to send required fields
export function addTask(task) {
    const payload = {
        user_id: 1,                // replace with dynamic user ID if available
        title: task,               // task title
        description: task,         // using same as title or allow user input
        status: "pending"          // default status
    };
    return axios.post(apiUrl, payload);
}

export function updateTask(id, task) {
    const payload = {
        title: task.title,
        description: task.description,
        status: task.status
    };
    return axios.put(`${apiUrl}/${id}`, payload);
}

export function deleteTask(id) {
    return axios.delete(`${apiUrl}/${id}`);
}
