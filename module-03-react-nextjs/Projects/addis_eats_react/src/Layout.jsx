import { Link, Outlet } from "react-router-dom";
import Navbar from "./ui/Navbar";

function Layout() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>Addis Eats</h2>

            <p>
              Enjoy authentic Ethiopian food, fresh and flavorful, delivered to
              your door.
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>

            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/cart">Cart</Link>
          </div>

          <div className="footer-links">
            <h3>Explore</h3>

            <Link to="/menu?category=fast">Fasting</Link>

            <Link to="/menu?category=non-fast">Non-Fasting</Link>

            <Link to="/menu?category=drinks">Drinks</Link>
          </div>

          <div className="footer-contact">
            <h3>Contact</h3>

            <p>Addis Ababa, Ethiopia</p>
            <p>Fresh food. Delivered with care.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Addis Eats. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
