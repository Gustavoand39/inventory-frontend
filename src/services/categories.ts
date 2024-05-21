import api from "../api/axiosConfig";

export const getCategories = async () => {
  const { data } = await api.get("categories/");
  return data;
};
