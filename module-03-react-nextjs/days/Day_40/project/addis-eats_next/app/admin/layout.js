import AdminGuard from "../../components/AdminGuard";
import AdminNav from "../../components/AdminNav";

function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminNav />

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </AdminGuard>
  );
}

export default AdminLayout;
