"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "../../../components/AdminAuthProvider";

function AdminLoginPage() {
  const router = useRouter();
  const { signIn } = useAdminAuth();

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
      setError("Invalid admin username or password.");
      return;
    }

    router.push("/admin");
  }

  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          Addis Eats
        </p>

        <h1 className="mt-2 text-4xl font-bold">Admin Login</h1>

        <p className="mt-3 text-[var(--muted)]">
          Sign in to manage Addis Eats.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm"
      >
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
            placeholder="enter user name"
            className="mt-2 w-full rounded-lg border border-[var(--border)] px-4 py-3 outline-none focus:border-[var(--primary)]"
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
            placeholder="enter your password"
            className="mt-2 w-full rounded-lg border border-[var(--border)] px-4 py-3 outline-none focus:border-[var(--primary)]"
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
          Demo admin: admin / 1234
        </p>
      </form>
    </section>
  );
}

export default AdminLoginPage;
