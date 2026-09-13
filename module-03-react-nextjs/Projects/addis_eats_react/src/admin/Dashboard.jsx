function Dashboard() {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <p>Welcome to the Addis Eats admin dashboard.</p>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h2>Menu</h2>
                    <p>Manage your dishes and menu items.</p>
                </div>

                <div className="dashboard-card">
                    <h2>Orders</h2>
                    <p>View and manage customer orders.</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;