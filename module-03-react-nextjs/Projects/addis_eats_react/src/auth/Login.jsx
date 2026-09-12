import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleLogin() {
        login();
        navigate("/checkout");
    }

    return (
        <div className="login-page">
            <h1>Sign In</h1>

            <p>
                Please sign in to continue to checkout.
            </p>

            <button onClick={handleLogin}>
                Sign In
            </button>
        </div>
    );
}

export default Login;