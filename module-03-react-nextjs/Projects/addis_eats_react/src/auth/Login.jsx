import { useState } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e) {
        e.preventDefault();

        if (username === "customer" && password === "1234") {
            login(username);
            navigate("/checkout");
        } else {
            alert("Invalid username or password.");
        }
    }

    return (
        <div className="login-page">
            <h1>Sign In</h1>

            <p>
                Please sign in to continue to checkout.
            </p>

            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default Login;

