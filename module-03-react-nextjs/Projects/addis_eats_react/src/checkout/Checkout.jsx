import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Field from "./Field";
import validateCheckout from "./validate";
import useCartStore from "../cart/cartStore";
import { getDeliveryFee, getDeliveryTime } from "../utils/deliveryEstimate";
import DeliveryEstimate from "./DeliveryEstimate";
import useOrderHistoryStore from "../orders/orderHistoryStore";
import formatCurrency from "../utils/formatCurrency";

function Checkout() {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
    instructions: "",
    paymentMethod: "Cash on Delivery",
  });

  const [errors, setErrors] = useState({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);

  const formRef = useRef(null);

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const addOrder = useOrderHistoryStore((state) => state.addOrder);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = getDeliveryFee(subtotal);
  const deliveryTime = getDeliveryTime();

  const total = subtotal + deliveryFee;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateCheckout(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      subtotal,
      deliveryFee,
      total,
      deliveryTime,
      customer: formData,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    addOrder(order);

    clearCart();

    setSubmittedOrder(order);
    setOrderSubmitted(true);
  }

  if (orderSubmitted) {
    return (
      <div className="checkout-page order-confirmation">
        <h1>Order Confirmed! 🎉</h1>

        <p>Thank you, {submittedOrder.customer.fullname}.</p>

        <p>Your order has been successfully placed.</p>

        <p>Order total: <strong>{formatCurrency(submittedOrder.total)}</strong> </p>

        <p>Estimated delivery: <strong>{submittedOrder.deliveryTime}</strong></p>

        <p>
          Your order status is currently{" "}
          <strong>{submittedOrder.status}</strong>.
        </p>

        <div className="confirmation-actions">
          <Link to="/orders">View My Orders</Link>

          <Link to="/menu">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
        <div className="checkout-page">
            <h1>Your Cart Is Empty</h1>

            <p> Please add some dishes before proceeding to checkout.</p>

            <Link className="browse-menu-link" to="/menu">Browse Menu</Link>
        </div>
    );
}

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <form ref={formRef} onSubmit={handleSubmit}>
        <Field
          label="Full Name"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        {errors.fullname && <p className="form-error">{errors.fullname}</p>}

        <Field
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="09xxxxxxxx"
        />

        {errors.phone && <p className="form-error">{errors.phone}</p>}

        <Field
          label="Delivery Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your delivery address"
        />

        {errors.address && <p className="form-error">{errors.address}</p>}

        <div className="form-field">
          <label htmlFor="instructions">Special Instruction</label>

          <textarea
            name="instructions"
            id="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Anything we should know?"
            rows="4"
          />
        </div>

        <div className="form-field">
          <label htmlFor="paymentMethod">Payment Method</label>

          <select
            name="paymentMethod"
            id="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="Cash on Delivery">Cash on Delivery</option>

            <option value="Telebirr">Telebirr</option>
          </select>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <p>
            Subtotal: <strong>{formatCurrency(subtotal)}</strong>
          </p>

          <DeliveryEstimate
            deliveryFee={deliveryFee}
            deliveryTime={deliveryTime}
          />

          <h3>Total: {formatCurrency(total)}</h3>
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
