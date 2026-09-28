"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

function SignInForm() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter your username and password.");
      return;
    }

    const success = signIn(username.trim(), password);

    if (!success) {
      setError("Invalid username or password.");
      return;
    }

    router.push("/checkout");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="username" className="block text-sm font-semibold">
          Username
        </label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            setError("");
          }}
          placeholder="Enter username"
          className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 outline-none focus:border-[var(--primary)]"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold">
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError("");
          }}
          placeholder="Enter password"
          className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 outline-none focus:border-[var(--primary)]"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-[var(--primary)] px-5 py-3 font-semibold text-white"
      >
        Sign In
      </button>

      <p className="text-center text-xs text-[var(--muted)]">
        Demo login: customer / 1234
      </p>
    </form>
  );
}

export default SignInForm;
