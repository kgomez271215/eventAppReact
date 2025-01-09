import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { OnboardingContext } from "../context/OnboardingContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(OnboardingContext);

  if (!state.completed) {
    return <Navigate to="/onboarding" />;
  }

  return children;
};

export default ProtectedRoute;
