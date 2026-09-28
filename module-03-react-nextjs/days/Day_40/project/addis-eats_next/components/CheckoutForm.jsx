"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useCart } from "./CartProvider";
import { useOrders } from "./OrderProvider";

function CheckoutForm() {
  const router = useRouter();

  const { user } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const { createOrder } = useOrders();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const phoneRegex = /^(09\d{8}|\+2519\d{8})$/;

    if (!phoneRegex.test(formData.phone.trim())) {
      setError(
        "Please enter a valid Ethiopian phone number, e.g. 0912345678 or +251912345678.",
      );
      return;
    }

    if (!formData.address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const order = createOrder({
      customer: {
        username: user.username,
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
      },
      deliveryAddress: formData.address.trim(),
      notes: formData.notes.trim(),
      items: cart,
      total: cartTotal,
    });

    clearCart();

    router.push(`/order-confirmation?id=${order.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="fullName" className="block text-sm font-semibold">
          Full Name
        </label>

        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 outline-none focus:border-[var(--primary)]"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold">
          Phone Number
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="09... / +251"
          className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 outline-none focus:border-[var(--primary)]"
        />

        <p className="mt-1 text-xs text-[var(--muted)]">
          Example: 0912345678 or +251912345678
        </p>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-semibold">
          Delivery Address
        </label>

        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="e.g. Bole, Mexico, Piassa"
          className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 outline-none focus:border-[var(--primary)]"
        />

        <p className="mt-1 text-xs text-[var(--muted)]">
          Enter an area or landmark in Addis Ababa.
        </p>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-semibold">
          Order Notes
          <span className="ml-1 text-xs font-normal text-[var(--muted)]">
            (optional)
          </span>
        </label>

        <textarea
          id="notes"
          name="notes"
          rows="3"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any special instructions?"
          className="mt-2 w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 outline-none focus:border-[var(--primary)]"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded-lg bg-[var(--primary)] px-5 py-3 font-semibold text-white"
      >
        Place Order
      </button>
    </form>
  );
}

export default CheckoutForm;
