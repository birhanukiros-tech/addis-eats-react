"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminAuth } from "./AdminAuthProvider";

function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAdminAuth();

  function handleSignOut() {
    signOut();
    router.push("/admin/login");
  }

  const links = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: "▦",
    },
    {
      href: "/admin/dishes",
      label: "Dishes",
      icon: "🍽️",
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: "📦",
    },
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-[var(--primary)] text-white">
      {/* Logo */}
      <div className="border-b border-white/10 px-6 py-6">
        <Link href="/admin" className="text-2xl font-bold">
          Addis Eats
        </Link>

        <p className="mt-1 text-sm text-white/60">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-white/50">
          Management
        </p>

        <div className="mt-3 space-y-2">
          {links.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-[var(--accent)] text-[#222]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-lg">{link.icon}</span>

                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sign Out */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full rounded-lg px-4 py-3 text-left font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          ↪ Sign Out
        </button>
      </div>
    </aside>
  );
}

export default AdminNav;
