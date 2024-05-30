import { useContext, useEffect } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

import { AuthContext } from "../context/AuthContext";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import SecureRoutes from "./SecureRoutes";

const AppRouter = () => {
  const { auth, refreshToken } = useContext(AuthContext);

  // Refrescar el token de autenticación
  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  if (auth.isCheckAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoutes isAuthenticated={auth.isAuth}>
              <AuthRoutes />
            </PublicRoutes>
          }
        />

        <Route
          path="*"
          element={
            <PrivateRoutes isAuthenticated={auth.isAuth}>
              <SecureRoutes />
            </PrivateRoutes>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
