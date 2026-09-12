import { useState,useRef } from "react";
import Field from "./Field";
import validateCheckout from "./validate";
import useCartStore from "../cart/cartStore";
import { getDeliveryFee, getDeliveryTime } from "../utils/deliveryEstimate";
import DeliveryEstimate from "./DeliveryEstimate";
import useOrderHistoryStore from "../orders/orderHistoryStore";
function Checkout() {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
    instructions: "",
    paymentMethod: "Cash on Delivery",
  });

  const [errors, setErrors] = useState({});
  const firstErrorRef = useRef(null);

  const cart = useCartStore((state) => state.cart);

    const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
    );

const deliveryFee = getDeliveryFee(subtotal);
const deliveryTime = getDeliveryTime();

const total = subtotal + deliveryFee;

const addOrder = useOrderHistoryStore(
    (state) => state.addOrder
);
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
        firstErrorRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center"
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
    createdAt: new Date().toISOString()
};

addOrder(order);
}

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <Field
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter your full name"
        />

        {errors.fullname && (
            <p
                ref={firstErrorRef}
                className="form-error">
                {errors.fullname}
            </p>
        )}

        <Field
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="09xxxxxxxx"
        />

         {errors.phone && (
        <p className="form-error">{errors.phone}</p>
        )}

        <Field
            label="Delivery Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your delivery address"
        />

         {errors.address && (
        <p className="form-error">{errors.address}</p>
        )}

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
            <option value="Cash on Delivery"> Cash on Delivery</option>
            <option value="Telebirr">Telebirr</option>
          </select>
        </div>

        <p>Test summery</p>
        <div className="checkout-summary">
                <h2>Order Summary</h2>

                <p>Subtotal: <strong>{subtotal} ETB</strong></p>

                <DeliveryEstimate
                    deliveryFee={deliveryFee}
                    deliveryTime={deliveryTime}
                />

                <h3>Total: {total} ETB</h3>
            </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}
export default Checkout;
