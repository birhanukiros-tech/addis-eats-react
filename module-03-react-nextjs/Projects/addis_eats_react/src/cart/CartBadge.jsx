import useCartStore from "./cartStore";

function CartBadge() {
    const cart = useCartStore((state) => state.cart);

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <span className="cart-badge">
            {cartCount}
        </span>
    );
}

export default CartBadge;