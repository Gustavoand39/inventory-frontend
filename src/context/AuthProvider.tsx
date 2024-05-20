import { ReactNode, useCallback, useState } from "react";
import { toast } from "sonner";

import { initialAuthState, AuthContext } from "./AuthContext";
import { IAuth } from "../interfaces/AuthContext";
import { IAuthResponse } from "../interfaces/Api";
import {
  login as loginUser,
  refreshToken as refreshUser,
} from "../services/auth";

interface IChildren {
  children: ReactNode;
}

const AuthProvider: React.FC<IChildren> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth>(initialAuthState);

  const login = async (
    username: string,
    password: string
  ): Promise<IAuthResponse> => {
    const resp = await loginUser(username, password);

    if (!resp.error) {
      sessionStorage.setItem("token", resp.token);

      const { id, username } = resp.user;

      setAuth({
        isAuth: true,
        isCheckAuth: false,
        uid: id,
        username: username,
      });
    }

    return resp;
  };

  const refreshToken = useCallback(async (): Promise<void> => {
    const token = sessionStorage.getItem("token");

    if (!token) return logout();

    const resp = await refreshUser(token);

    if (resp.error) {
      toast.error(resp.message);
      return logout();
    }

    const { id, username } = resp.user;

    setAuth({
      isAuth: true,
      isCheckAuth: false,
      uid: id,
      username: username,
    });

    sessionStorage.setItem("token", resp.token);
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

export default AuthProvider;
