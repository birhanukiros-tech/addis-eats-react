import OrderHistoryItem from "./OrderHistoryItem";
import useOrderHistoryStore from "./orderHistoryStore";
import useCartStore from "../cart/cartStore";
import { useNavigate } from "react-router-dom";
import EmptyState from "../ui/EmptyState";

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
                
                <EmptyState 
                    title= "No orders yet"
                    message= "You haven't placed any orders yet." />
            </div>
        );
    }

    return (
        <div className="orders-page">
            <h1>My Orders</h1>

        {orders.map((order) => (
            <OrderHistoryItem
            key={order.id}
            order={order}
            onReorder={handleReorder}
            />
        ))} 


        </div>
    );
}

export default OrderHistory;