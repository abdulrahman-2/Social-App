import { User } from "@/types/types";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  token: string | null;
  user: User | null;
  saveTokenAndUser: (user: User, token: string) => void;
  isAuthenticated: boolean;
}>({
  token: null,
  user: null,
  saveTokenAndUser: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const saveTokenAndUser = (user: User, userToken: string) => {
    setToken(userToken);
    setUser(user);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        saveTokenAndUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
