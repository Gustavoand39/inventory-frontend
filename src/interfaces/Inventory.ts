import { IApiResponse, IPaginatedResponse } from "./Api";

export interface InventoryState {
  id: number;
  name: string;
  description: string;
  stock: number;
  minStock: number;
  image: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}
export interface Inventory {
  id: number;
  product: string;
  user: string;
  details: string;
  date: string;
  newState: InventoryState;
  oldState: InventoryState;
}

export interface InventoryListResponse extends IPaginatedResponse {
  data: Inventory[];
}

export interface InventoryResponse extends IApiResponse {
  data: Inventory;
}
