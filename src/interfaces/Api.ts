export interface IApiResponse {
  error: boolean;
  message: string;
}

export interface IApiDataResponse extends IApiResponse {
  totalItems: number;
  totalPages: number;
}

export interface IAuthResponse extends IApiResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}
