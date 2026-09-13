import { createContext, useState } from "react";

const AdminAuthContext = createContext();

function AdminAuthProvider({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);

    function login() {
        setIsAdmin(true);
    }

    function logout() {
        setIsAdmin(false);
    }

    return (
        <AdminAuthContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export { AdminAuthContext, AdminAuthProvider };