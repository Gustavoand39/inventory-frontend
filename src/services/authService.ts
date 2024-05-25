import { toast } from "sonner";
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
  const { data } = await api.post<IAuthResponse>("auth/refresh", { token });

  if (data.error) {
    toast.error(data.message);
    return data;
  }

  return data;
};
