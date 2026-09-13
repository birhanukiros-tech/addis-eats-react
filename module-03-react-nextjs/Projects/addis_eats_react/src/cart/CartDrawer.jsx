import { useNavigate } from "react-router-dom";
import useCartStore from "./cartStore";

function CartDrawer({ onClose }) {
    const navigate = useNavigate();

    const cart = useCartStore((state) => state.cart);
    const increaseQuantity = useCartStore(
        (state) => state.increaseQuantity,
    );
    const decreaseQuantity = useCartStore(
        (state) => state.decreaseQuantity,
    );
    const removeFromCart = useCartStore(
        (state) => state.removeFromCart,
    );

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    function handleCheckout() {
        onClose();
        navigate("/checkout");
    }

    return (
        <aside className="cart-drawer">
            <div className="cart-drawer-header">
                <h2>🛒 Your Cart</h2>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close cart"
                >
                    ✕
                </button>
            </div>

            <div className="cart-drawer-items">
                {cart.map((item) => (
                    <div
                        className="cart-drawer-item"
                        key={item.id}
                    >
                        <div className="cart-drawer-item-info">
                            <h3>{item.name}</h3>
                            <p>{item.price} ETB</p>
                        </div>

                        <div className="cart-drawer-controls">
                            <button
                                type="button"
                                onClick={() =>
                                    decreaseQuantity(item.id)
                                }
                                aria-label={`Decrease ${item.name} quantity`}
                            >
                                −
                            </button>

                            <span>{item.quantity}</span>

                            <button
                                type="button"
                                onClick={() =>
                                    increaseQuantity(item.id)
                                }
                                aria-label={`Increase ${item.name} quantity`}
                            >
                                +
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    removeFromCart(item.id)
                                }
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-drawer-footer">
                <p>
                    <strong>Items:</strong> {totalItems}
                </p>

                <p>
                    <strong>Total:</strong> {totalPrice} ETB
                </p>

                <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                >
                    Proceed to Checkout
                </button>
            </div>
        </aside>
    );
}

export default CartDrawer;