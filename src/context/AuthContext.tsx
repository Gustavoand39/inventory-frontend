import { createContext, ReactNode, useCallback, useState } from "react";
import { toast } from "sonner";

import {
  login as loginUser,
  refreshToken as refreshUser,
} from "../services/authService";
import {
  initialAuthState,
  initialAuthContext,
} from "../constants/inititalStateAuth";
import { IAuth, IAuthContext } from "../interfaces/AuthContext";
import handleAxiosError from "../helpers/handleAxiosError";

interface IChildren {
  children: ReactNode;
}

// Crear el contexto de autenticación
export const AuthContext = createContext<IAuthContext>(initialAuthContext);

export const AuthProvider: React.FC<IChildren> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth>(initialAuthState);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const resp = await loginUser(username, password);

      if (resp.error) {
        toast.error(resp.message);
        return resp.error;
      }

      sessionStorage.setItem("token", resp.token);

      setAuth({
        isAuth: true,
        isCheckAuth: false,
        uid: resp.data.id,
        username: resp.data.username,
      });

      return resp.error;
    } catch (error) {
      const err = handleAxiosError(error);
      toast.error(err.message);
      return false;
    }
  };

  const refreshToken = useCallback(async (): Promise<void> => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) return logout();

      const resp = await refreshUser();

      if (resp.error) {
        toast.error(resp.message);
        return logout();
      }

      const { id, username } = resp.data;

      setAuth({
        isAuth: true,
        isCheckAuth: false,
        uid: id,
        username: username,
      });

      sessionStorage.setItem("token", resp.token);
    } catch (error) {
      const err = handleAxiosError(error);
      toast.error(err.message);
      logout();
    }
  }, []);

  const logout = (): void => {
    setAuth({
      ...initialAuthState,
      isCheckAuth: false,
    });
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, login, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
