import { toast } from "sonner";

import api from "../api/axiosConfig";
import {
  INewUser,
  IUser,
  IUserListResponse,
  IUserResponse,
} from "../interfaces/user";
import handleAxiosError from "../helpers/handleAxiosError";

interface IGetUsersProps {
  page: number;
  limit: number;
  setUsers: (users: IUser[]) => void;
  setTotalUsers: (total: number) => void;
  setTotalPages: (total: number) => void;
}

export const getListUsers = async ({
  page,
  limit,
  setUsers,
  setTotalUsers,
  setTotalPages,
}: IGetUsersProps): Promise<void> => {
  try {
    const { data } = await api.get<IUserListResponse>(
      `users/?page=${page}&limit=${limit}`
    );

    if (data.error) {
      toast.error(data.message);
      return;
    }

    if (data.totalItems && data.totalPages) {
      setUsers(data.data);
      setTotalUsers(data.totalItems);
      setTotalPages(data.totalPages);
    }
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};

export const createUser = async (
  user: INewUser,
  callback: (data: IUserResponse) => void
): Promise<void> => {
  try {
    const { data } = await api.post<IUserResponse>("users/", user);

    if (data.error) {
      toast.error(data.message);
      return;
    }

    callback(data);
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};

export const getUser = async (id: number): Promise<IUser> => {
  try {
    const { data } = await api.get<IUserResponse>(`users/${id}`);

    if (data.error) {
      toast.error(data.message);
      return {} as IUser;
    }

    return data.data;
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
    return {} as IUser;
  }
};

export const updateUser = async (
  id: number,
  user: INewUser,
  callback: (data: IUserResponse) => void
): Promise<void> => {
  try {
    const { data } = await api.put<IUserResponse>(`users/${id}`, user);

    if (data.error) {
      toast.error(data.message);
      return;
    }

    callback(data);
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    const { data } = await api.delete<IUserResponse>(`users/${id}`);

    if (data.error) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};
