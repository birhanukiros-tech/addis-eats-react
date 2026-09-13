import { useContext } from "react";
import { AdminAuthContext } from "./AdminAuthContext";

function useAdminAuth() {
    return useContext(AdminAuthContext);
}

export default useAdminAuth;