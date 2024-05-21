import api from "../api/axiosConfig";
import { IProduct, IProductResponse } from "../interfaces/Product";

export const getProducts = async () => {
  const { data } = await api.get("products/");
  return data as IProductResponse;
};

export const getProduct = async (id: number) => {
  const { data } = await api.get(`products/${id}`);
  return data as IProductResponse;
};

export const createProduct = async (product: IProduct, image: File | null) => {
  if (image) {
    const resp = await api.post("upload/image/", image);
    console.log(resp);
    product.image = resp.data;
  }
  console.log(product);
  const { data } = await api.post("products/", product);
  return data as IProductResponse;
};
