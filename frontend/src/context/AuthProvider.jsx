import React, { useCallback, useState } from "react";
import AuthContext from "./authContext.js";
import {jwtDecode} from "jwt-decode"; 
import { login as loginService } from "../services/api/auth-service.js";

const AuthProvider = ({ children }) => {
  // Load token from localStorage
  const initialToken = localStorage.getItem("token");

  // Decode user from token if exists
  const initialUser = (() => {
    if (!initialToken) return null;
    try {
      return jwtDecode(initialToken);
    } catch {
      return null;
    }
  })();

  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(initialToken || null); // fix: use initialToken
  const [loading, setLoading] = useState(false);

  // Login function
  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const resp = await loginService(credentials);
      const newToken = resp.data.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
      const decodedUser = jwtDecode(newToken);
      setUser(decodedUser);
      return decodedUser;
    } catch (err) {
      console.error(err?.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
