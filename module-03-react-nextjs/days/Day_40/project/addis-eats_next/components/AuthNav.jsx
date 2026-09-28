"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

function AuthNav() {
  const router = useRouter();
  const { isLoaded, isAuthenticated, signOut } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (isAuthenticated) {
    function handleSignOut() {
      signOut();
      router.push("/");
    }

    return (
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-lg bg-[var(--primary)] px-4 py-2 font-semibold text-white"
      >
        Sign Out
      </button>
    );
  }

  return (
    <Link
      href="/signin"
      className="rounded-lg bg-[var(--primary)] px-4 py-2 font-semibold text-white"
    >
      Sign In
    </Link>
  );
}

export default AuthNav;
