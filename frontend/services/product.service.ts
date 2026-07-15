import api from "@/lib/api";

export const getProducts = async (query?: string) => {
  try {
    console.log("Calling API...");

    const response = await api.get("/products", {
      params: query ? { query } : {},
    });

    console.log("Status:", response.status);
    console.log("Data:", response.data);

    return response.data;
  } catch (error: any) {
    console.log("Full Error:", error);
    console.log("Error Message:", error.message);
    console.log("Error Code:", error.code);
    console.log("Error Config:", error.config);

    throw error;
  }
};