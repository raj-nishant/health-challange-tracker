import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute: React.FC = () => {
  const user = localStorage.getItem("username");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <NavbarMenu />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
