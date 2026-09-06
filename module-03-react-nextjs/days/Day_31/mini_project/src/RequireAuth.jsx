import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./App";

function RequireAuth({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // If the mock login is currently loading, display a message
  if (loading) {
    return <div style={{ padding: "30px", textAlign: "center" }}>Verifying credentials...</div>;
  }

  // If there is no signed-in user, redirect them to the login page
  // We save the 'location' they wanted to visit in state so we can send them back later
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
