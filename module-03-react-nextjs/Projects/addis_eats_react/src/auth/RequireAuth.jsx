import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

function RequireAuth({ children }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default RequireAuth;