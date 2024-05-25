import { toast } from "sonner";

import api from "../api/axiosConfig";
import {
  INewCategory,
  ICategory,
  ICategoryListResponse,
  ICategoryResponse,
} from "../interfaces/Categories";
import handleAxiosError from "../helpers/handleAxiosError";

interface IGetCategoriesProps {
  page: number;
  limit: number;
  setCategories: (categories: ICategory[]) => void;
  setTotalCategories: (total: number) => void;
  setTotalPages: (total: number) => void;
}

export const getListCategories = async ({
  page,
  limit,
  setCategories,
  setTotalCategories,
  setTotalPages,
}: IGetCategoriesProps): Promise<void> => {
  try {
    const { data } = await api.get<ICategoryListResponse>(
      `categories/?page=${page}&limit=${limit}`
    );

    if (data.error) {
      toast.error(data.message);
      return;
    }

    if (data.totalItems && data.totalPages) {
      setCategories(data.data);
      setTotalCategories(data.totalItems);
      setTotalPages(data.totalPages);
    }
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};

export const getCategories = async (
  setCategories: (item: ICategory[]) => void
): Promise<void> => {
  try {
    const { data } = await api.get<ICategoryListResponse>("categories/");

    if (data.error) {
      toast.error(data.message);
      return;
    }

    setCategories(data.data);
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};

export const getCategory = async (id: number): Promise<ICategory> => {
  try {
    const { data } = await api.get<ICategoryResponse>(`categories/${id}`);

    if (data.error) {
      toast.error(data.message);
      return {} as ICategory;
    }

    return data.data;
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
    return {} as ICategory;
  }
};

export const createCategory = async (
  category: INewCategory
): Promise<boolean> => {
  try {
    const { data } = await api.post<ICategoryResponse>("categories/", category);

    if (data.error) {
      toast.error(data.message);
      return false;
    }

    toast.success(data.message);
    return true;
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
    return false;
  }
};

export const updateCategory = async (category: ICategory): Promise<boolean> => {
  try {
    const { data } = await api.put<ICategoryResponse>(
      `categories/${category.id}`,
      category
    );

    if (data.error) {
      toast.error(data.message);
      return false;
    }

    toast.success(data.message);
    return true;
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
    return false;
  }
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  try {
    const { data } = await api.delete<ICategoryResponse>(`categories/${id}`);

    if (data.error) {
      toast.error(data.message);
      return false;
    }

    toast.success(data.message);
    return true;
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
    return false;
  }
};

interface IGetCategoriesProps {
  word: string;
  page: number;
  limit: number;
  setCategories: (categories: ICategory[]) => void;
  setTotalCategories: (total: number) => void;
  setTotalPages: (total: number) => void;
}

export const searchCategories = async ({
  word,
  page,
  limit,
  setCategories,
  setTotalCategories,
  setTotalPages,
}: IGetCategoriesProps): Promise<void> => {
  try {
    const { data } = await api.get<ICategoryListResponse>("categories/search", {
      params: { word, page, limit },
    });

    if (data.error) {
      toast.error(data.message);
      return;
    }

    if (data.totalItems && data.totalPages) {
      setCategories(data.data);
      setTotalCategories(data.totalItems);
      setTotalPages(data.totalPages);
    }
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};
