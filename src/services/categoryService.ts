import api from "../api/axiosConfig";
import { ICategory, ICategoryResponse } from "../interfaces/Categories";
import handleAxiosError from "../helpers/handleAxiosError";
import { toast } from "sonner";

interface ICategoryResp extends ICategoryResponse {
  totalItems: number;
  totalPages: number;
}

interface IGetCategoriesProps {
  page: number;
  limit: number;
  setCategories: (categories: ICategory[]) => void;
  setTotalCategories: (total: number) => void;
  setTotalPages: (total: number) => void;
}

export const getCategories = async ({
  page,
  limit,
  setCategories,
  setTotalCategories,
  setTotalPages,
}: IGetCategoriesProps): Promise<void> => {
  try {
    const { data } = await api.get<ICategoryResp>(
      `categories/?page=${page}&limit=${limit}`
    );

    if (data.error) {
      toast.error(data.message);
      return;
    }

    if (data.categories) {
      setCategories(data.categories);
      setTotalCategories(data.totalItems);
      setTotalPages(data.totalPages);
    }
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};

export const getCategory = async (id: number) => {
  const { data } = await api.get(`categories/${id}`);
  return data;
};
