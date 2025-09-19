import React, { useState, useEffect } from "react";
import api from "./services/api";

export default function Tasks({ user: propUser, onLogout }) {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const token = localStorage.getItem("token");

  // Ensure user is available even if prop is lost
  const user = propUser?.id ? propUser : JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.id) {
      console.warn("User ID missing — redirecting to login");
      onLogout();
    }
  }, [user, onLogout]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const createTask = async () => {
    if (!user?.id || !task.trim()) {
      alert("User ID and task title are required");
      console.log("Debug:", { userId: user?.id, task });
      return;
    }

    const payload = {
      user_id: user.id,
      title: task,
      description: description || "",
      status: "pending"
    };

    try {
      const res = await api.post("/tasks", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, res.data]);
      setTask("");
      setDescription("");
    } catch (err) {
      console.error("Failed to create task:", err);
      alert("❌ Task creation failed");
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const updateTask = async () => {
    try {
      const res = await api.put(
        `/tasks/${editingId}`,
        { title: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t.id === editingId ? res.data : t)));
      cancelEditing();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, {user?.name || "User"}</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New task"
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ padding: "0.5rem", width: "300px", marginLeft: "1rem" }}
        />
        <button onClick={createTask} style={{ marginLeft: "1rem" }}>
          Add Task
        </button>
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t.id} style={{ marginBottom: "0.5rem" }}>
            {editingId === t.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ padding: "0.3rem", width: "250px" }}
                />
                <button onClick={updateTask} style={{ marginLeft: "0.5rem" }}>
                  Save
                </button>
                <button onClick={cancelEditing} style={{ marginLeft: "0.5rem" }}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <strong>{t.title}</strong> — {t.description}
                <button onClick={() => startEditing(t)} style={{ marginLeft: "1rem" }}>
                  Edit
                </button>
                <button onClick={() => deleteTask(t.id)} style={{ marginLeft: "0.5rem" }}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <button onClick={onLogout} style={{ marginTop: "2rem" }}>
        Logout
      </button>
    </div>
  );
}
