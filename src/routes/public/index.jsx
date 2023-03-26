import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicRoutes = ({ children }) => {
  const authcatied = useAuth();
  return !authcatied ? children : <Navigate to="/inbox" />;
};

export default PublicRoutes;
