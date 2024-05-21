import api from "../api/axiosConfig";

export const getCategories = async () => {
  const { data } = await api.get("categories/");
  return data;
};

export const getCategory = async (id: number) => {
  const { data } = await api.get(`categories/${id}`);
  return data;
};
