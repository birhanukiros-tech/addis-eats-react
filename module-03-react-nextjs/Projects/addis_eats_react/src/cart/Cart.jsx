import useCartStore from "./cartStore";

function Cart() {
    const cart = useCartStore((state) => state.cart);
    const increaseQuantity = useCartStore(
        (state) => state.increaseQuantity
    );
    const decreaseQuantity = useCartStore(
        (state) => state.decreaseQuantity
    );
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const removeFromCart = useCartStore(
    (state) => state.removeFromCart
    );

    if(cart.length === 0){
        return(
            <div>
                <h1>Your Cart</h1>
                <p>Your cart is empty</p>
            </div>
        );
    }
    return(
        <div>
            <h1>Your Cart</h1>

            {cart.map((item) =>(
                <div key={item.id}>
                    <h2>{item.name}</h2>

                    <button onClick={() =>decreaseQuantity(item.id)}>
                        -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.id)}>
                        +
                    </button>
               
                    <p>{item.price * item.quantity} ETB</p>

                    <button onClick={() => removeFromCart(item.id)}>
                        Remove
                    </button>
                </div>
            ))}

            <h2>Total: {total}</h2>
        </div>
    );
}
export default Cart;
