import useOrderHistoryStore from "../orders/orderHistoryStore";
import formatCurrency from "../utils/formatCurrency";

function OrderManager() {
    const orders = useOrderHistoryStore(
        (state) => state.orders
    );

    const updateOrderStatus = useOrderHistoryStore(
        (state) => state.updateOrderStatus
    );

    function handleStatusChange(orderId, status) {
        updateOrderStatus(orderId, status);
    }

    if (orders.length === 0) {
        return (
            <div className="admin-orders">
                <h1>Manage Orders</h1>
                <p>No orders have been placed yet.</p>
            </div>
        );
    }

    return (
        <div className="admin-orders">
            <h1>Manage Orders</h1>

            {orders.map((order) => (
                <article
                    className="admin-order-card"
                    key={order.id}
                >
                    <h2>Order #{order.id}</h2>

                    <p>Customer:{" "}{order.customer.fullname}</p>

                    <p>Phone: {order.customer.phone}</p>

                    <p>Address:{" "}{order.customer.address}</p>

                    {order.customer.instructions && (
                   <p>Instructions:{" "}{order.customer.instructions}</p>
                    )}

                    <h3>Items</h3>

                    {order.items.map((item) => (
                        <p key={item.id}>
                            {item.name} × {item.quantity}
                        </p>
                    ))}

                    <p>Subtotal:{" "}{formatCurrency(order.subtotal)}</p>

                    <p>
                        Delivery Fee:{" "}
                        {order.deliveryFee === 0
                            ? "Free"
                            : formatCurrency(
                                order.deliveryFee
                            )}
                    </p>

                    <h3>Total:{" "}{formatCurrency(order.total)}</h3>

                    <p>Payment:{" "}{order.customer.paymentMethod}</p>

                    <label htmlFor={`status-${order.id}`}>Order Status</label>

                    <select
                        id={`status-${order.id}`}
                        value={order.status}
                        onChange={(event) =>
                            handleStatusChange(
                                order.id,
                                event.target.value
                            )
                        }
                    >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </article>
            ))}
        </div>
    );
}

export default OrderManager;