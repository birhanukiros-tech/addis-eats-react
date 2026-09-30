import { useState } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      login(username);
      navigate("/checkout");
    } else {
      setError("Please enter a valid username and password.");
    }
  }

  return (
    <div className="login-page">
      <h1>Sign In</h1>

      <p>Please sign in to continue to checkout.</p>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
