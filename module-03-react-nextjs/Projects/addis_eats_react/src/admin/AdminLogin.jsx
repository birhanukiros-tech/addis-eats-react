import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "./useAdminAuth";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const { login } = useAdminAuth();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    // Demo login: any non-empty username and password are accepted
    if (username.trim() && password.trim()) {
      login();
      navigate("/admin");
      return;
    }

    setError("Please enter a username and password.");
  }

  function handleForgotPassword() {
    setForgotMessage(
      "Please contact the system administrator to reset the password.",
    );
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="admin-username">Username</label>
            <input
              type="text"
              id="admin-username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="admin-password">Password</label>
            <input
              type="password"
              id="admin-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit">Sign In</button>
        </form>

        <button
          type="button"
          className="forgot-password"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>

        {forgotMessage && <p className="forgot-message">{forgotMessage}</p>}
      </div>
    </div>
  );
}

export default AdminLogin;
