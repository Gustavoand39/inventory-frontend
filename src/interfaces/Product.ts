import { IApiResponse } from "./Api";

export interface IProduct {
  id?: number;
  name: string;
  description: string;
  stock: number;
  minStock: number;
  image: string;
  category: number;
}

export interface IProductResponse extends IApiResponse {
  product?: IProduct;
  products?: IProduct[];
}
