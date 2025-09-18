import React, { Component } from "react";
import Tasks from "./Tasks";
import { Paper, TextField, Checkbox, Button } from "@material-ui/core";
import "./App.css"; // Make sure your CSS exists

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>My To-Do List</h1>
        </header>
        <div className="main-content">
          <Paper elevation={3} className="todo-container">
            <Tasks />
          </Paper>
        </div>
      </div>
    );
  }
}

export default App;
