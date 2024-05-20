export interface IApiResponse {
  error: boolean;
  message: string;
}

export interface IAuthResponse extends IApiResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}
