"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../components/CartProvider";

function CartPage() {
  const {
    cart,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          Addis Eats
        </p>

        <h1 className="mt-3 text-4xl font-bold">Your Cart Is Empty</h1>

        <p className="mt-4 max-w-md text-[var(--muted)]">
          You haven't added any dishes yet. Explore our menu and choose
          something delicious.
        </p>

        <Link
          href="/menu"
          className="mt-6 rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-white"
        >
          Explore Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          Addis Eats
        </p>

        <h1 className="mt-2 text-4xl font-bold">Your Cart</h1>

        <p className="mt-3 text-[var(--muted)]">
          Review your items before checkout.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <article
              key={item.id}
              className="flex gap-5 rounded-xl border border-[var(--border)] bg-white p-4"
            >
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={`/${item.image}`}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-bold">{item.name}</h2>

                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {item.price} ETB each
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm font-semibold text-red-600"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)]"
                    >
                      −
                    </button>

                    <span className="min-w-6 text-center font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded border border-[var(--border)]"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold text-[var(--primary)]">
                    {item.price * item.quantity} ETB
                  </p>
                </div>
              </div>
            </article>
          ))}

          <button
            onClick={clearCart}
            className="text-sm font-semibold text-red-600"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <aside className="h-fit rounded-xl border border-[var(--border)] bg-white p-6">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="mt-6 flex items-center justify-between border-b pb-4">
            <span className="text-[var(--muted)]">Items</span>

            <span className="font-semibold">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-semibold">Total</span>

            <span className="text-xl font-bold text-[var(--primary)]">
              {cartTotal} ETB
            </span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block rounded-lg bg-[var(--primary)] px-5 py-3 text-center font-semibold text-white"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default CartPage;
