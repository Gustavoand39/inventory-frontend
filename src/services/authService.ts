import { toast } from "sonner";
import api from "../api/axiosConfig";
import { IAuthResponse } from "../interfaces/Api";

export const login = async (
  username: string,
  password: string
): Promise<IAuthResponse> => {
  const { data } = await api.post<IAuthResponse>("auth/login", {
    username,
    password,
  });

  return data;
};

export const refreshToken = async (): Promise<IAuthResponse> => {
  const { data } = await api.post<IAuthResponse>("auth/refresh");

  if (data.error) {
    toast.error(data.message);
    return data;
  }

  return data;
};
