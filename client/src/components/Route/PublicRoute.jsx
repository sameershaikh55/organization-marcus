import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Public = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Public;
