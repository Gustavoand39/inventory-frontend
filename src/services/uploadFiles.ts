import api from "../api/axiosConfig";

export const uploadImage = async (formData: FormData) => {
  console.log("formData: ", formData);
  const { data } = await api.post("upload/image/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
