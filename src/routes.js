import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./features/auth/Signup";
import Login from "./features/auth/Login";
import HomeMother from "./features/home/HomeMother";
import ProtectedRoute from "./lib/ProtectedRoute";
import ChatBot from "./features/chat/ChatBot";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<ChatBot />} />

      <Route
        path="/home-mother"
        element={
          <ProtectedRoute>
            <HomeMother />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
