import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";

import AuthProvider from "./context/AuthProvider";
import Router from "./routes/AppRouter";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>

      <Toaster position="top-right" duration={3000} theme="system" />
    </NextUIProvider>
  </React.StrictMode>
);
