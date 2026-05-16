import React, { useContext } from "react";
import { AuthContext } from "../Components/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {

  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {

    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) {

    return children;

  }

  return (
    <Navigate
      state={{ from: location }}
      to="/login"
      replace
    />
  );
};

export default PrivateRoute;