import useCartStore from "./cartStore";
import formatCurrency from "../utils/formatCurrency";

function CartItem({ item }) {
    const increaseQuantity = useCartStore(
        (state) => state.increaseQuantity
    );

    const decreaseQuantity = useCartStore(
        (state) => state.decreaseQuantity
    );

    const removeFromCart = useCartStore(
        (state) => state.removeFromCart
    );

    const subtotal = item.price * item.quantity;

    return (
        <div className="cart-item">
            <h2>{item.name}</h2>

            <button onClick={() => decreaseQuantity(item.id)}>
                −
            </button>

            <span>{item.quantity}</span>

            <button onClick={() => increaseQuantity(item.id)}>
                +
            </button>

            <p>{formatCurrency(subtotal)}</p>

            <button onClick={() => removeFromCart(item.id)}>
                Remove
            </button>
        </div>
    );
}

export default CartItem;