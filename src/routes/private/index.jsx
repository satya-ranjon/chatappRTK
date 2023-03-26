import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const authcatied = useAuth();
  return !authcatied ? <Navigate to="/" /> : children;
};

export default PrivateRoutes;
