import { Link, Outlet } from "react-router-dom";
import useAdminAuth from "./useAdminAuth";

function AdminLayout() {
  const { logout } = useAdminAuth();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Addis Eats Admin</h2>

        <nav aria-label="Admin navigation">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/menu">Menu</Link>
          <Link to="/admin/orders">Orders</Link>
        </nav>

        <button type="button" onClick={logout}>
          Sign Out
        </button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
