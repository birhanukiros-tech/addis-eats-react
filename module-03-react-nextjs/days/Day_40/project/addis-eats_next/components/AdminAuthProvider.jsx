"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AdminAuthContext = createContext(null);

const ADMIN_STORAGE_KEY = "addis_eats_admin";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";

function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);

      if (savedAdmin) {
        setAdmin(JSON.parse(savedAdmin));
      }
    } catch (error) {
      console.error("Failed to load admin:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  function signIn(username, password) {
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return false;
    }

    const newAdmin = {
      username,
    };

    setAdmin(newAdmin);

    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(newAdmin));

    return true;
  }

  function signOut() {
    setAdmin(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isLoaded,
        isAuthenticated: Boolean(admin),
        signIn,
        signOut,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}

export default AdminAuthProvider;
