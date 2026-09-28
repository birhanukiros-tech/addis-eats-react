"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import CartDrawer from "./CartDrawer";

function CartButton() {
  const [isOpen, setIsOpen] = useState(false);

  const { cartCount } = useCart();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative font-medium"
      >
        Cart
        {cartCount > 0 && (
          <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-xs font-bold text-black">
            {cartCount}
          </span>
        )}
      </button>

      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default CartButton;
