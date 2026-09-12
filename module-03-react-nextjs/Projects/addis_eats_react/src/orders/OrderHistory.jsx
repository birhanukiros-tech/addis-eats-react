import useOrderHistoryStore from "./orderHistoryStore";
import useCartStore from "../cart/cartStore";
import { useNavigate } from "react-router-dom";
function OrderHistory() {
    const navigate = useNavigate();
    const addToCart = useCartStore(
        (state) => state.addToCart
    );
    const orders = useOrderHistoryStore(
        (state) => state.orders
    );

    function handleReorder(order) {
    order.items.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
            addToCart(item);
            }
        });
        navigate("/cart");
    }

    if (orders.length === 0) {
        return (
            <div className="orders-page">
                <h1>My Orders</h1>
                <p>You haven't placed any orders yet.</p>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <h1>My Orders</h1>

            {orders.map((order) => (
                <article
                    className="order-card"
                    key={order.id}
                >
                    <h2>Order #{order.id}</h2>

                    <p>Status: <strong>{order.status}</strong></p>

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
                        {order.deliveryFee === 0
                            ? "Free"
                            : `${order.deliveryFee} ETB`}
                    </p>

                    <h3>Total: {order.total} ETB</h3>

                    <button onClick={() => handleReorder(order)}>Reorder</button>
                </article>
            ))}
        </div>
    );
}

export default OrderHistory;