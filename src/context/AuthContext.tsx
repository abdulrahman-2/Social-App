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
    if (typeof window !== "undefined" && window.localStorage) {
      const storedToken = window.localStorage.getItem("token");
      const storedUser = window.localStorage.getItem("user");

      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const saveTokenAndUser = (user: User, userToken: string) => {
    setToken(userToken);
    setUser(user);
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("token", userToken);
      window.localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const deleteTokenAndUser = () => {
    setToken("");
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    }
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
