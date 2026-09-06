import React, { useContext } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { CartContext } from "./CartProvider";
import { AuthContext } from "./App";

function Layout() {
  const { items, total } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const styleLink = ({ isActive }) => ({
    marginRight: "15px",
    color: isActive ? "#e67e22" : "#2c3e50",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none"
  });

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8f9fa", padding: "15px 20px", borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ textDecoration: "none", fontSize: "22px", fontWeight: "bold", color: "#e67e22" }}>Addis Eats 🇪🇹</Link>
        <nav>
          <NavLink to="/" style={styleLink}>Home</NavLink>
          <NavLink to="/menu" style={styleLink}>Menu</NavLink>
          <NavLink to="/cart" style={styleLink}>Cart ({items.length})</NavLink>
          <NavLink to="/checkout" style={styleLink}>Checkout</NavLink>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ fontSize: "14px", fontWeight: "bold", color: "#27ae60" }}>{total} ETB</span>
          {user ? (
            <div>
              <span style={{ fontSize: "13px", marginRight: "10px" }}>👤 {user.name}</span>
              <button onClick={logout} style={{ fontSize: "11px", padding: "2px 6px" }}>Logout</button>
            </div>
          ) : (
            <Link to="/login" style={{ fontSize: "14px", textDecoration: "none", color: "#2980b9" }}>Sign In</Link>
          )}
        </div>
      </header>
      
      <main style={{ minHeight: "350px", background: "#fff" }}>
        <Outlet />
      </main>
      
      <footer style={{ background: "#2c3e50", color: "#bbb", padding: "12px", textAlign: "center", fontSize: "12px" }}>
        IBT CodeOps Architecture Assignment — Addis Eats
      </footer>
    </div>
  );
}

export default Layout;
