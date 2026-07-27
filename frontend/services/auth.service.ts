import axios from "axios";
import { LoginRequest, RegisterRequest, User } from "@/types/auth";

const authApi = axios.create({
  baseURL: "http://127.0.0.1:8080/api/v1/auth",
});

export const loginUser = async (data: LoginRequest): Promise<string> => {
  // Spring Boot returns JWT token as plain string
  const response = await authApi.post<string>("/login", data);
  return response.data;
};

export const registerUser = async (data: RegisterRequest): Promise<User> => {
  const response = await authApi.post<User>("/register", data);
  return response.data;
};

// Token management
const TOKEN_KEY = "pricepilot_token";
const USER_KEY = "pricepilot_user";

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getSavedUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

// Decode JWT payload to extract user info
export const decodeToken = (token: string): { email: string; exp: number } | null => {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return {
      email: decoded.sub || decoded.email,
      exp: decoded.exp,
    };
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  return Date.now() >= decoded.exp * 1000;
};
