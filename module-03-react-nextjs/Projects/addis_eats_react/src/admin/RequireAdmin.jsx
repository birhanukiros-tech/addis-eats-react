import { Navigate } from "react-router-dom";
import useAdminAuth from "./useAdminAuth";

function RequireAdmin({ children }) {
    const { isAdmin } = useAdminAuth();

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}

export default RequireAdmin;