import React from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Board from "./pages/Board";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/board" element={isAuthenticated ? <Board /> : <Navigate to="/" />} />
    </Routes>
  );
}
