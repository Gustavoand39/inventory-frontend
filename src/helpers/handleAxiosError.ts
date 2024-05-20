import axios from "axios";

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    const { data } = error.response;

    return {
      error: true,
      message: data?.message || "Error desconocido",
    };
  }

  return {
    error: true,
    message: "Un error inesperado ha ocurrido",
  };
};

export default handleAxiosError;
