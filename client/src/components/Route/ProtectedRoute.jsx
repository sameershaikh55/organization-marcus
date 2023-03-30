import React from "react";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } else {
    return <Loader />;
  }
};

export default Protected;
