import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../../Context/context";

const PrivateRoute = () => {
  const { state } = useContext(GlobalContext);
  return state.token ? <Outlet /> : <Navigate to="/sign" />;
};

export default PrivateRoute;