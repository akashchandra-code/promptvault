import { createContext, useEffect, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get logged-in user
  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    setUser(res.data.user);
    return res.data;
  };

  // Login
  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    setUser(res.data.user);
    return res.data;
  };

  // Logout
  const logout = async () => {
    await api.get("/auth/logout");
    setUser(null);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
