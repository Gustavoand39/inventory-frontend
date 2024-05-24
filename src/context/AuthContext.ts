import { createContext } from "react";
import { IAuth, IAuthContext } from "../interfaces/AuthContext";
import { IAuthResponse } from "../interfaces/Api";

// Estado inicial para la autenticación
export const initialAuthState: IAuth = {
  isAuth: false, // El usuario no está autenticado
  isCheckAuth: true, // Se está verificando la autenticación
};

// Estado inicial para el contexto
const initialAuthContext: IAuthContext = {
  auth: initialAuthState,
  login: async (): Promise<IAuthResponse> => {
    return {
      error: true,
      message: "¡No se ha implementado el login!",
      token: "",
      user: { id: 0, username: "" },
    };
  },
  refreshToken: async (): Promise<void> => {},
  logout: () => {},
};

// Crear el contexto de autenticación
export const AuthContext = createContext<IAuthContext>(initialAuthContext);
