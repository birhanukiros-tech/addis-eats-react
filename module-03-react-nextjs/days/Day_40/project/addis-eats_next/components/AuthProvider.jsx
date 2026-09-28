"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "addis_eats_user";

const VALID_USERNAME = "customer";
const VALID_PASSWORD = "1234";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  function signIn(username, password) {
    if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
      return false;
    }

    const newUser = {
      username,
    };

    setUser(newUser);

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));

    return true;
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoaded,
        isAuthenticated: Boolean(user),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
