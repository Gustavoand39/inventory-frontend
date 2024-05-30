import { IApiResponse, IPaginatedResponse } from "./Api";

export interface INewProduct {
  name: string;
  description: string;
  stock: number;
  minStock: number;
  image: string;
  category: number;
}

export interface IProduct extends INewProduct {
  id: number;
}

export interface IProductListResponse extends IPaginatedResponse {
  data: IProduct[];
}

export interface IProductResponse extends IApiResponse {
  data: IProduct;
}

export type ProductFormValues = Partial<IProduct & INewProduct>;
