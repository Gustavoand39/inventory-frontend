import React from "react";
import { Route, Routes } from "react-router-dom";

const Login = React.lazy(() => import("../pages/Login"));

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default AuthRoutes;
