import { toast } from "sonner";

import api from "../api/axiosConfig";
import handleAxiosError from "../helpers/handleAxiosError";
import { IProduct, IProductResponse } from "../interfaces/Product";
import { getCategory } from "./categories";
import { uploadImage } from "./uploadFiles";

interface IProductsResp extends IProductResponse {
  total: number;
}

interface IGetProductsProps {
  page: number;
  rowsPerPage: number;
  setProducts: (products: IProduct[]) => void;
  setTotalPages: (total: number) => void;
}

export const getProducts = async ({
  page,
  rowsPerPage,
  setProducts,
  setTotalPages,
}: IGetProductsProps): Promise<void> => {
  try {
    const { data } = await api.get<IProductsResp>(
      `products/?page=${page}&limit=${rowsPerPage}`
    );

    if (data.products && data.total) {
      setProducts(data.products);
      setTotalPages(data.total);
    }
  } catch (error) {
    const resp = handleAxiosError(error);
    toast.error(resp.message);
  }
};

export const getProduct = async (id: number) => {
  const { data } = await api.get(`products/${id}`);
  return data as IProductResponse;
};

export const createProduct = async (
  product: IProduct,
  image: File | null
): Promise<boolean> => {
  try {
    if (image) {
      const { data } = await getCategory(product.category);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("folder", data.name);

      const resp = await uploadImage(formData);
      product.image = resp.data;
    }

    const { data } = await api.post<IProductResponse>("products/", product);

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
      const { data } = await getCategory(product.category);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("folder", data.name);

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
