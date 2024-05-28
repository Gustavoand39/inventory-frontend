import { toast } from "sonner";

import api from "../api/axiosConfig";
import {
  InventoryLog,
  InventoryListResponse,
  InventoryResponse,
} from "../interfaces/InventoryLog";
import handleAxiosError from "../helpers/handleAxiosError";

interface IGetInventoryProps {
  page: number;
  limit: number;
  setInventory: (inventory: InventoryLog[]) => void;
  setTotalInventory: (total: number) => void;
  setTotalPages: (total: number) => void;
}

export const getListInventory = async ({
  page,
  limit,
  setInventory,
  setTotalInventory,
  setTotalPages,
}: IGetInventoryProps): Promise<void> => {
  try {
    const { data } = await api.get<InventoryListResponse>(
      `inventory/?page=${page}&limit=${limit}`
    );

    if (data.error) {
      toast.error(data.message);
      return;
    }

    if (data.totalItems && data.totalPages) {
      setInventory(data.data);
      setTotalInventory(data.totalItems);
      setTotalPages(data.totalPages);
    }
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};

export const getLastInventory = async (
  setInventoryLog: (item: InventoryLog[]) => void
): Promise<void> => {
  try {
    const { data } = await api.get<InventoryListResponse>("inventory/last");

    if (data.error) {
      toast.error(data.message);
      return;
    }

    setInventoryLog(data.data);
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};

export const getInventoryById = async (
  id: number,
  setInventory: (item: InventoryLog) => void
): Promise<void> => {
  try {
    const { data } = await api.get<InventoryResponse>(`inventory/${id}`);
    console.log(data);
    if (data.error) {
      toast.error(data.message);
      return;
    }

    setInventory(data.data);
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};
