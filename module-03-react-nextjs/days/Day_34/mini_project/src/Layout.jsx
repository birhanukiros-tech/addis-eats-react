import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import useCartStore from "./cartStore";
import useAuth from "./useAuth";

function Layout() {
  const items = useCartStore((state) => state.items);
  const { user, logout } = useAuth();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/" className="brand-logo">Addis Eats 🍽️ 🇪🇹</Link>
        <nav>
          <NavLink to="/" className="nav-link-item">Home</NavLink>
          <NavLink to="/menu" className="nav-link-item">Menu</NavLink>
          <NavLink to="/cart" className="nav-link-item">Cart ({items.length})</NavLink>
          <NavLink to="/checkout" className="nav-link-item">Checkout</NavLink>
        </nav>
        <div className="header-actions">
          <span className="cart-total-badge">{total} ETB</span>
          {user ? (
            <div className="user-profile-zone">
              <span>👤 {user.name}</span>
              <button onClick={logout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="signin-link">Sign In</Link>
          )}
        </div>
      </header>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
