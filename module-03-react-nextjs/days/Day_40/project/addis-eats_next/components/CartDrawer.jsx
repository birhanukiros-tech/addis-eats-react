"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";

function CartDrawer() {
  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    isDrawerOpen,
    closeCartDrawer,
  } = useCart();

  if (!isDrawerOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCartDrawer}
        className="absolute inset-0 h-full w-full bg-black/40"
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-[var(--primary)]">
              Addis Eats
            </p>

            <h2 className="text-2xl font-bold">Your Cart</h2>
          </div>

          <button
            type="button"
            onClick={closeCartDrawer}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border text-xl hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-5xl">🛒</div>

              <h3 className="mt-4 text-xl font-bold">Your cart is empty</h3>

              <p className="mt-2 text-sm text-[var(--muted)]">
                Add some delicious Ethiopian dishes to get started.
              </p>

              <Link
                href="/menu"
                onClick={closeCartDrawer}
                className="mt-6 rounded-lg bg-[var(--primary)] px-5 py-3 font-semibold text-white"
              >
                Explore Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item) => (
                <article key={item.id} className="flex gap-4 border-b pb-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={`/${item.image}`}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold">{item.name}</h3>

                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {item.price} ETB
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-semibold text-red-600"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)]"
                        >
                          −
                        </button>

                        <span className="min-w-5 text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)]"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-bold text-[var(--primary)]">
                        {item.price * item.quantity} ETB
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t bg-white px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>

              <span className="text-2xl font-bold text-[var(--primary)]">
                {cartTotal} ETB
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={closeCartDrawer}
                className="rounded-lg border border-[var(--primary)] px-4 py-3 text-center font-semibold text-[var(--primary)]"
              >
                View Cart
              </Link>

              <Link
                href="/checkout"
                onClick={closeCartDrawer}
                className="rounded-lg bg-[var(--primary)] px-4 py-3 text-center font-semibold text-white"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
