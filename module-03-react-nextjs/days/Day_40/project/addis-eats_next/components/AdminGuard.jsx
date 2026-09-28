"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuth } from "./AdminAuthProvider";

function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const { isLoaded, isAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [isLoaded, isAuthenticated, pathname, router]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-[var(--muted)]">Checking admin access...</p>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null;
  }

  return children;
}

export default AdminGuard;
