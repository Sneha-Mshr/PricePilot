import axios from "axios";
import { SearchResponse } from "@/types/search";
import { SEARCH_API_URL } from "@/lib/config";

const searchApi = axios.create({
  baseURL: SEARCH_API_URL,
  // Live scraping of three stores can take a while on a cold cloud instance.
  timeout: 60000,
});

export const searchProducts = async (query: string): Promise<SearchResponse> => {
  const response = await searchApi.post<SearchResponse>("/search", {
    query,
  });
  return response.data;
};
