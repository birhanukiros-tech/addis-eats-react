import useOrderHistoryStore from "../orders/orderHistoryStore";
import formatCurrency from "../utils/formatCurrency";

function OrderManager() {
  const orders = useOrderHistoryStore((state) => state.orders);

  const updateOrderStatus = useOrderHistoryStore(
    (state) => state.updateOrderStatus,
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

      <div className="admin-order-list">
        {orders.map((order) => (
          <article className="admin-order-card" key={order.id}>
            <div className="admin-order-header">
              <h2>Order #{order.id}</h2>

              {order.createdAt && (
                <p>{new Date(order.createdAt).toLocaleString()}</p>
              )}
            </div>

            <div className="admin-order-customer">
              <h3>Customer</h3>

              <p><strong>Name:</strong> {order.customer.fullname}</p>

              <p><strong>Phone:</strong> {order.customer.phone}</p>

              <p><strong>Address:</strong> {order.customer.address}</p>

              {order.customer.instructions && (
                <p><strong>Instructions:</strong> {order.customer.instructions}</p>
              )}

              <p><strong>Payment:</strong> {order.customer.paymentMethod}</p>
            </div>

            <div className="admin-order-items">
              <h3>Items</h3>

              {order.items.map((item) => (
                <div className="admin-order-item" key={item.id}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    {formatCurrency(Number(item.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="admin-order-summary">
              <p>
                <span>Subtotal</span>
                <strong>{formatCurrency(order.subtotal)}</strong>
              </p>

              <p>
                <span>Delivery Fee</span>
                <strong>
                  {order.deliveryFee === 0
                    ? "Free"
                    : formatCurrency(order.deliveryFee)}
                </strong>
              </p>

              <h3>
                <span>Total</span>
                <strong>{formatCurrency(order.total)}</strong>
              </h3>
            </div>

            <div className="admin-order-status">
              <label htmlFor={`status-${order.id}`}>Order Status</label>

              <select
                id={`status-${order.id}`}
                value={order.status}
                onChange={(event) =>
                  handleStatusChange(order.id, event.target.value)
                }
              >
                <option value="Pending">Pending</option>

                <option value="Preparing">Preparing</option>

                <option value="Out for Delivery">Out for Delivery</option>

                <option value="Delivered">Delivered</option>

                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default OrderManager;
