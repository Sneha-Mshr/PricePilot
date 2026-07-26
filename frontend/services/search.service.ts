import axios from "axios";
import { SearchResponse } from "@/types/search";

const searchApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v2",
});

export const searchProducts = async (query: string): Promise<SearchResponse> => {
  const response = await searchApi.post<SearchResponse>("/search", {
    query,
  });
  return response.data;
};
