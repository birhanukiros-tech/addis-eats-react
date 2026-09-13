import useOrderHistoryStore from "../orders/orderHistoryStore";
import formatCurrency from "../utils/formatCurrency";

function Dashboard() {
    const orders = useOrderHistoryStore((state) => state.orders);

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        (order) => order.status === "Pending"
    ).length;

    const totalRevenue = orders.reduce(
        (total, order) => total + Number(order.total || 0),
        0
    );

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <p>Welcome to the Addis Eats admin dashboard.</p>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h2>Menu</h2>
                    <p>12</p>
                    <span>Menu items</span>
                </div>

                <div className="dashboard-card">
                    <h2>Orders</h2>
                    <p>{totalOrders}</p>
                    <span>Total orders</span>
                </div>

                <div className="dashboard-card">
                    <h2>Pending</h2>
                    <p>{pendingOrders}</p>
                    <span>Orders waiting</span>
                </div>

                <div className="dashboard-card">
                    <h2>Revenue</h2>
                    <p>{formatCurrency(totalRevenue)}</p>
                    <span>Total order value</span>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;