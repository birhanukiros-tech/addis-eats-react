import Link from "next/link";
import CartCount from "./CartCount";
import FavoriteCount from "./FavoriteCount";
import AuthNav from "./AuthNav";
import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--primary)] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-[var(--primary)] shadow-sm">
            AE
          </span>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">
              Addis Eats
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-widest text-white/60">
              Ethiopian Food
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/menu"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            Menu
          </Link>

          <Link
            href="/favorites"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            ♡ Favorites
            <FavoriteCount />
          </Link>

          <Link
            href="/orders"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            Orders
          </Link>

          <Link
            href="/cart"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
          >
            🛒 Cart
            <CartCount />
          </Link>
          <ThemeToggle />

          <div className="ml-2 border-l border-white/20 pl-3">
            <AuthNav />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
