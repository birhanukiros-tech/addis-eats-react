import useCartStore from "./cartStore";
import CartItem from "./CartItem";

function Cart() {
    const cart = useCartStore((state) => state.cart);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <h1>Your Cart</h1>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>

            {cart.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                />
            ))}

            <div className="cart-total">
                <h2>Total: {total} ETB</h2>
            </div>
        </div>
    );
}

export default Cart;