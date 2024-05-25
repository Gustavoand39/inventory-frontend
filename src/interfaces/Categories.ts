import { IApiResponse, IPaginatedResponse } from "./Api";

export interface INewCategory {
  name: string;
}

export interface ICategory extends INewCategory {
  id: number;
}

export interface ICategoryListResponse extends IPaginatedResponse {
  data: ICategory[];
}

export interface ICategoryResponse extends IApiResponse {
  data: ICategory;
}

export type CategoryFormValues = Partial<ICategory & INewCategory>;
