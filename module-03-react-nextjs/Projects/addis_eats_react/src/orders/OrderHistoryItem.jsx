function OrderHistoryItem({ order, onReorder }) {
  return (
    <article className="order-card">
      <h2>Order #{order.id}</h2>

      <p>
        Status: <strong>{order.status}</strong>
      </p>

      <p>Delivery: {order.deliveryTime}</p>

      <div>
        {order.items.map((item) => (
          <p key={item.id}>
            {item.name} × {item.quantity}
          </p>
        ))}
      </div>

      <p>Subtotal: {order.subtotal} ETB</p>

      <p>
        Delivery Fee:{" "}
        {order.deliveryFee === 0 ? "Free" : `${order.deliveryFee} ETB`}
      </p>

      <h3>Total: {order.total} ETB</h3>

      <button type="button" onClick={() => onReorder(order)}>
        Reorder
      </button>
    </article>
  );
}

export default OrderHistoryItem;
