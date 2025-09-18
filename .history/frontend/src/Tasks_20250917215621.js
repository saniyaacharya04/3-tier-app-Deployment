import React, { Component } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./taskServices";
import { Paper, TextField, Checkbox, Button } from "@material-ui/core";

class Tasks extends Component {
    state = {
        tasks: [],
        currentTask: ""
    };

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks = async () => {
        try {
            const response = await getTasks();
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
            await addTask(currentTask);
            this.setState({ currentTask: "" });
            this.fetchTasks(); // refresh task list
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    handleUpdate = async (id) => {
        const task = this.state.tasks.find((t) => t.id === id);
        if (!task) return;

        const updatedTask = {
            title: task.title,
            description: task.description,
            status: task.status === "pending" ? "completed" : "pending"
        };

        try {
            await updateTask(id, updatedTask);
            this.fetchTasks(); // refresh task list
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    handleDelete = async (id) => {
        try {
            await deleteTask(id);
            this.fetchTasks(); // refresh task list
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    render() {
        const { tasks, currentTask } = this.state;

        return (
            <div className="app">
                <header className="app-header">
                    <h1>My To-Do List</h1>
                </header>
                <div className="main-content">
                    <Paper elevation={3} className="todo-container">
                        <form onSubmit={this.handleSubmit} className="task-form">
                            <TextField
                                variant="outlined"
                                size="small"
                                className="task-input"
                                value={currentTask}
                                required
                                onChange={this.handleChange}
                                placeholder="Add New TO-DO"
                            />
                            <Button
                                className="add-task-btn"
                                color="primary"
                                variant="outlined"
                                type="submit"
                            >
                                Add Task
                            </Button>
                        </form>
                        <div className="tasks-list">
                            {tasks.map((task) => (
                                <Paper key={task.id} className="task-item">
                                    <Checkbox
                                        checked={task.status === "completed"}
                                        onClick={() => this.handleUpdate(task.id)}
                                        color="primary"
                                    />
                                    <div
                                        className={
                                            task.status === "completed"
                                                ? "task-text completed"
                                                : "task-text"
                                        }
                                    >
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
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Tasks;
