import api from "@/lib/api";

export const getProducts = async (query?: string) => {
  // The API filters on `search`, not `query`.
  const response = await api.get("/products", {
    params: query ? { search: query, limit: 50 } : { limit: 50 },
  });

  return response.data;
};
export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};