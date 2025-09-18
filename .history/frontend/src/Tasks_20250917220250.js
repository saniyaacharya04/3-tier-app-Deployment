import React, { Component } from "react";
import * as taskServices from "./services/taskServices"; // Adjust path if needed
import { Paper, TextField, Checkbox, Button } from "@material-ui/core";
import "./App.css";

class Tasks extends Component {
  state = {
    tasks: [],
    currentTask: "",
  };

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = async () => {
    try {
      const response = await taskServices.getTasks();
      this.setState({ tasks: response.data });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  handleChange = (e) => {
    this.setState({ currentTask: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { currentTask } = this.state;
    if (!currentTask.trim()) return;

    try {
      await taskServices.addTask(currentTask); // send string, backend wraps it
      this.setState({ currentTask: "" });
      this.fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  handleUpdate = async (id) => {
    const task = this.state.tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedStatus = task.status === "done" ? "pending" : "done";
    try {
      await taskServices.updateTask(id, { ...task, status: updatedStatus });
      this.fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  handleDelete = async (id) => {
    try {
      await taskServices.deleteTask(id);
      this.fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  render() {
    const { tasks, currentTask } = this.state;

    return (
      <div className="tasks-container">
        <form onSubmit={this.handleSubmit} className="task-form">
          <TextField
            variant="outlined"
            size="small"
            value={currentTask}
            onChange={this.handleChange}
            placeholder="Add New Task"
            required
          />
          <Button type="submit" color="primary" variant="outlined">
            Add Task
          </Button>
        </form>

        <div className="tasks-list">
          {tasks.map((task) => (
            <Paper key={task.id} className="task-item">
              <Checkbox
                checked={task.status === "done"}
                onClick={() => this.handleUpdate(task.id)}
                color="primary"
              />
              <div className={task.status === "done" ? "task-text completed" : "task-text"}>
                {task.title}
              </div>
              <Button
                onClick={() => this.handleDelete(task.id)}
                color="secondary"
                className="delete-task-btn"
              >
                Delete
              </Button>
            </Paper>
          ))}
        </div>
      </div>
    );
  }
}

export default Tasks;
