import { User } from "@/types/types";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  token: string;
  user: User | null;
  saveTokenAndUser: (user: User, token: string) => void;
  deleteTokenAndUser: () => void;
  isAuthenticated: boolean;
}>({
  token: "",
  user: null,
  saveTokenAndUser: () => {},
  deleteTokenAndUser: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");
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

  const deleteTokenAndUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        saveTokenAndUser,
        deleteTokenAndUser,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
