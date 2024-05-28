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
  setInventoryLog: (inventory: InventoryLog[]) => void;
  setTotalInventoryLog: (total: number) => void;
  setTotalPages: (total: number) => void;
}

export const getListInventory = async ({
  page,
  limit,
  setInventoryLog,
  setTotalInventoryLog,
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

    console.log(data);
    if (data.totalItems && data.totalPages) {
      setInventoryLog(data.data);
      setTotalInventoryLog(data.totalItems);
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

interface ICreateInventoryProps extends IGetInventoryProps {
  word: string;
}

export const getSearchInventory = async ({
  word,
  page,
  limit,
  setInventoryLog,
  setTotalInventoryLog,
  setTotalPages,
}: ICreateInventoryProps): Promise<void> => {
  try {
    const { data } = await api.get<InventoryListResponse>("inventory/search/", {
      params: { word, page, limit },
    });

    if (data.error) {
      toast.error(data.message);
      return;
    }

    if (data.totalItems && data.totalPages) {
      setInventoryLog(data.data);
      setTotalInventoryLog(data.totalItems);
      setTotalPages(data.totalPages);
    }
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};
