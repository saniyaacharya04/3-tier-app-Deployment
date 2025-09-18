import React from "react";
import Tasks from "./Tasks";
import "./App.css"; // Your CSS file

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <h1>My To-Do List</h1>
            </header>
            <main className="main-content">
                <Tasks /> {/* Tasks component now handles all state and API */}
            </main>
        </div>
    );
}

export default App;
