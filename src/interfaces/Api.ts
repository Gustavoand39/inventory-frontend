import { IUserAuth } from "./user";
export interface IApiResponse {
  error: boolean;
  message: string;
}

export interface IPaginatedResponse extends IApiResponse {
  totalItems?: number;
  totalPages?: number;
}

export interface IAuthResponse extends IApiResponse {
  token: string;
  user: IUserAuth;
}
