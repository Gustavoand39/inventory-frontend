import { IAuth, IAuthContext } from "../interfaces/AuthContext";

// Estado inicial para la autenticación
export const initialAuthState: IAuth = {
  isAuth: false, // El usuario no está autenticado
  isCheckAuth: true, // Se está verificando la autenticación
};

// Estado inicial para el contexto
export const initialAuthContext: IAuthContext = {
  auth: initialAuthState,
  login: async (): Promise<boolean> => {
    return false;
  },
  refreshToken: async (): Promise<void> => {},
  logout: () => {},
};