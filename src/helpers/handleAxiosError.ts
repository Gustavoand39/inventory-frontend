import axios from "axios";

const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    const { data } = error.response;

    return {
      error: true,
      message:
        data?.message ||
        data?.errors[0].msg ||
        `Error desconocido: ${error.response.status}`,
    };
  }

  return {
    error: true,
    message: "Un error inesperado ha ocurrido. Intenta de nuevo.",
  };
};

export default handleAxiosError;
