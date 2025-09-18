import React, { useState, useEffect } from "react";
import api from "./services/api";

export default function Tasks({ user, onLogout }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const token = localStorage.getItem("token");

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
    try {
      const res = await api.post(
        "/tasks",
        { title: task },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([...tasks, res.data]);
      setTask("");
    } catch (err) {
      console.error("Failed to create task:", err);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, {user.name}</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="New task"
          style={{ padding: "0.5rem", width: "300px" }}
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
                {t.title}
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
