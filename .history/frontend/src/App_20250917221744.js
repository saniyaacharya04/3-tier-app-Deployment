import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Tasks from "./Tasks";
import Login from "./Login";
import Register from "./Register";

function App() {
  const isLoggedIn = !!localStorage.getItem("user_id");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={isLoggedIn ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/tasks" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
