import React, { Component } from "react";
import Tasks from "./Tasks";
import { Paper, Typography } from "@material-ui/core";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <Typography variant="h3" component="h1">
            My To-Do List
          </Typography>
        </header>

        <div className="main-content">
          <Paper elevation={3} className="todo-container">
            {/* Tasks Component handles the form and list */}
            <Tasks />
          </Paper>
        </div>
      </div>
    );
  }
}

export default App;
