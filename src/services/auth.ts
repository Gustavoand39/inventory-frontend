// src/services/authService.js
import api from "../api/axiosConfig";
import { IAuthResponse } from "../interfaces/Api";

export const login = async (
  username: string,
  password: string
): Promise<IAuthResponse> => {
  const { data } = await api.post("auth/login", { username, password });
  return data as IAuthResponse;
};

export const refreshToken = async (token: string): Promise<IAuthResponse> => {
  try {
    const { data } = await api.post("auth/refresh", { token });
    return data as IAuthResponse;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
