import React, { createContext, useEffect, useState } from "react";
import AuthService from "../services/auth-service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
    });
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};
