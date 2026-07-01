import api from "@/lib/api";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};