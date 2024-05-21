import api from "../api/axiosConfig";

export const uploadImage = async (formData: FormData) => {
  const { data } = await api.post("upload/image/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const getImage = async (fileName: string) => {
  const resp = await api.get(`upload/image/${fileName}`, {
    responseType: "blob", // Esto asegura que la respuesta sea tratada como un archivo binario
  });
  return resp;
};
