import { IApiResponse } from "./Api";

export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoryResponse extends IApiResponse {
  category?: ICategory;
  categories?: ICategory[];
}
