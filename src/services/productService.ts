import { toast } from "sonner";

import api from "../api/axiosConfig";
import handleAxiosError from "../helpers/handleAxiosError";
import { IApiResponse } from "../interfaces/Api";
import {
  INewProduct,
  IProduct,
  IProductListResponse,
  IProductResponse,
} from "../interfaces/Product";
import { getCategory } from "./categoryService";
import { uploadImage } from "./uploadFiles";

interface IGetProductsProps {
  page: number;
  limit: number;
  setProducts: (products: IProduct[]) => void;
  setTotalProducts: (total: number) => void;
  setTotalPages: (total: number) => void;
}

export const getListProducts = async ({
  page,
  limit,
  setProducts,
  setTotalProducts,
  setTotalPages,
}: IGetProductsProps): Promise<void> => {
  try {
    const { data } = await api.get<IProductListResponse>(
      `products/?page=${page}&limit=${limit}`
    );

    if (data.error) {
      toast.error(data.message);
      return;
    }

    if (data.totalItems && data.totalPages) {
      setProducts(data.data);
      setTotalProducts(data.totalItems);
      setTotalPages(data.totalPages);
    }
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};

export const getProduct = async (
  id: number,
  setFormValue: (product: IProduct) => void
): Promise<void> => {
  try {
    const { data } = await api.get(`products/${id}`);

    if (data.error) {
      const error = handleAxiosError(data.error);
      toast.error(error.message);
      return;
    }

    if (!data.error && data.data) setFormValue(data.data);
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};

export const getLowProducts = async (
  setProducts: (products: IProduct[]) => void
): Promise<void> => {
  try {
    const { data } = await api.get<IProductListResponse>("products/low");

    if (data.error) {
      toast.error(data.message);
      return;
    }

    setProducts(data.data);
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};

export const createProduct = async (
  product: INewProduct,
  image: File | null
): Promise<boolean> => {
  try {
    if (image) {
      const { name } = await getCategory(product.category);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("folder", name);

      const resp = await uploadImage(formData);
      product.image = resp.data;
    }

    const { data } = await api.post<IApiResponse>("products/", product);

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

export const updateProduct = async (
  product: IProduct,
  image: File | null
): Promise<boolean> => {
  try {
    if (image) {
      const { name } = await getCategory(product.category);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("folder", name);

      const resp = await uploadImage(formData);
      product.image = resp.data;
    }

    const { data } = await api.put<IProductResponse>(
      `products/${product.id}`,
      product
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

export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    const { data } = await api.delete<IProductResponse>(`products/${id}`);

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

interface ISearchProductsProps {
  word: string;
  page: number;
  limit: number;
  setProducts: (products: IProduct[]) => void;
  setTotalProducts: (total: number) => void;
  setTotalPages: (totalPages: number) => void;
}

export const searchProducts = async ({
  word,
  page,
  limit,
  setProducts,
  setTotalProducts,
  setTotalPages,
}: ISearchProductsProps): Promise<void> => {
  try {
    const { data } = await api.get<IProductListResponse>(`products/search`, {
      params: { word, page, limit },
    });

    if (data.error) {
      toast.error(data.message);
      return;
    }

    if (data.totalItems && data.totalPages) {
      setProducts(data.data);
      setTotalProducts(data.totalItems);
      setTotalPages(data.totalPages);
    }
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};
