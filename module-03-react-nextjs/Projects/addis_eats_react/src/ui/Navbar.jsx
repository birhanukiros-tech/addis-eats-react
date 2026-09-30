import { Link } from "react-router-dom";
import CartBadge from "../cart/CartBadge";
import useAuth from "../auth/useAuth";
import ThemeToggle from "../theme/ThemeToggle";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/">🍽️ Addis Eats</Link>

      <div>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/cart">
          Cart 🛒
          <CartBadge />
        </Link>
        <Link to="/orders">Orders</Link>

        {/* Admin access */}
        <Link to="/admin/login">Admin</Link>

        <ThemeToggle />

        {user ? (
          <button onClick={logout}>Sign Out</button>
        ) : (
          <Link to="/login">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
