import api from "../api/axiosConfig";
import { IProduct, IProductResponse } from "../interfaces/Product";
import { getCategory } from "./categories";
import { uploadImage } from "./uploadFiles";

export const getProducts = async (page: number, limit: number) => {
  const { data } = await api.get(`products/?page=${page}&limit=${limit}`);
  return data as IProductResponse;
};

export const getProduct = async (id: number) => {
  const { data } = await api.get(`products/${id}`);
  return data as IProductResponse;
};

export const createProduct = async (product: IProduct, image: File | null) => {
  if (image) {
    const { data } = await getCategory(product.category);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("folder", data.name);

    const resp = await uploadImage(formData);
    product.image = resp.data;
  }

  const { data } = await api.post("products/", product);
  return data as IProductResponse;
};

export const updateProduct = async (product: IProduct, image: File | null) => {
  if (image) {
    const { data } = await getCategory(product.category);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("folder", data.name);

    const resp = await uploadImage(formData);
    product.image = resp.data;
  }

  const { data } = await api.put(`products/${product.id}`, product);
  return data as IProductResponse;
};

export const deleteProduct = async (id: number) => {
  const { data } = await api.delete(`products/${id}`);
  return data as IProductResponse;
};
