"use client";

import { useCart } from "./CartProvider";

function CartCount() {
  const { cartCount } = useCart();

  if (cartCount === 0) {
    return null;
  }

  return (
    <span className="ml-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-xs font-bold text-black">
      {cartCount}
    </span>
  );
}

export default CartCount;