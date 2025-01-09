import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "../views/Onboarding";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { Login } from "../views/Login.jsx";
import { Home } from "../views/Home.jsx";
import NotFound from "../views/NotFound.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<ProtectedRoute> <Login /> </ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
