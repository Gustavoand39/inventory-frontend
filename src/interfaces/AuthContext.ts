import { IAuthResponse } from "./Api";

// Interfaz para el estado de autenticación
export interface IAuth {
  isAuth: boolean;
  isCheckAuth?: boolean;
  uid?: number;
  username?: string;
}

// Interfaz para el contexto de autenticación
export interface IAuthContext {
  auth: IAuth;
  login: (user: string, password: string) => Promise<IAuthResponse>;
  refreshToken: () => Promise<void>;
  logout: () => void;
}
