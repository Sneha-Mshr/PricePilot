import axios from "axios";
import { PRODUCTS_API_URL } from "@/lib/config";

const api = axios.create({
  baseURL: PRODUCTS_API_URL,
});

export default api;
