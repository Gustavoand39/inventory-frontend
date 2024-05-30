import { IApiResponse, IPaginatedResponse } from "./Api";

export interface IUserAuth {
  id: number;
  username: string;
}

export interface INewUser {
  name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
}

export interface IUser extends Omit<INewUser, "password"> {
  id: number;
}

export interface IUserListResponse extends IPaginatedResponse {
  data: IUser[];
}

export interface IUserResponse extends IApiResponse {
  data: IUser;
}

export type UserFormValues = Partial<IUser & INewUser>;
