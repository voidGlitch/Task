import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../../Context/context";

const PublicRoute = () => {
  const { state } = useContext(GlobalContext);
  return !state.token ? <Outlet /> : <Navigate to="/home" />;
};

export default PublicRoute;