"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, LoginRequest, RegisterRequest } from "@/types/auth";
import {
  loginUser,
  registerUser,
  saveToken,
  getToken,
  removeToken,
  saveUser,
  getSavedUser,
  decodeToken,
  isTokenExpired,
} from "@/services/auth.service";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      const savedUser = getSavedUser();
      if (savedUser) {
        setUser(savedUser);
      } else {
        // Decode email from token as fallback
        const decoded = decodeToken(token);
        if (decoded) {
          setUser({
            id: "",
            name: decoded.email.split("@")[0],
            email: decoded.email,
          });
        }
      }
    } else if (token) {
      // Token expired, clean up
      removeToken();
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginRequest) => {
    const token = await loginUser(data);
    saveToken(token);

    // Extract user info from token
    const decoded = decodeToken(token);
    const loggedInUser: User = {
      id: "",
      name: decoded?.email.split("@")[0] || "",
      email: decoded?.email || data.email,
    };

    saveUser(loggedInUser);
    setUser(loggedInUser);
  };

  const register = async (data: RegisterRequest) => {
    const registeredUser = await registerUser(data);

    // Auto-login after registration
    const token = await loginUser({
      email: data.email,
      password: data.password,
    });

    saveToken(token);

    const newUser: User = {
      id: registeredUser.id || "",
      name: registeredUser.name || data.name,
      email: registeredUser.email || data.email,
    };

    saveUser(newUser);
    setUser(newUser);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
