"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

function AddToCartButton({ dish }) {
  const { addToCart, openCartDrawer } = useCart();

  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(dish);
    openCartDrawer();

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="rounded-lg bg-[var(--primary)] px-4 py-2 font-semibold text-white"
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}

export default AddToCartButton;
