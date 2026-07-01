import api from "@/lib/api";

export const getProducts = async () => {
  const response = await api.get("/products");

  console.log("Axios Response:", response);

  return response.data;
};