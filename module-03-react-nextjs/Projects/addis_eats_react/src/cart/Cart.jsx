import useCartStore from "./cartStore";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import EmptyState from "../ui/EmptyState";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>

        <EmptyState
            title= "Your cart is empty"
            message= "Add some delicious dishes from our menu." />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <div className="cart-total">
        <h2>Total: {total} ETB</h2>

        <button
          className="checkout-button"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
