import { Outlet } from "react-router-dom";
import Navbar from "./ui/Navbar";

function Layout() {
    return (
        <div className="app-layout">
            <Navbar />

            <main className="main-content">
                <Outlet />
            </main>

            <footer className="footer">
                <p>© 2026 Addis Eats. All rights reserved.</p>
            </footer>
        </div>
    );
}
export default Layout;