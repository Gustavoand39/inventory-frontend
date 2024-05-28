import { IApiResponse, IPaginatedResponse } from "./Api";

export interface Inventory {
  id: number;
  product: string;
  user: string;
  details: string;
  date: string;
}

export interface InventoryListResponse extends IPaginatedResponse {
  data: Inventory[];
}

export interface InventoryResponse extends IApiResponse {
  data: Inventory;
}
