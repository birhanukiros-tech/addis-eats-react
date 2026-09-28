"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthProvider";
import { useCart } from "../../components/CartProvider";
import CheckoutForm from "../../components/CheckoutForm";

function CheckoutPage() {
  const router = useRouter();
  const { user, isLoaded, isAuthenticated } = useAuth();
  const { cart, cartTotal } = useCart();

  useEffect(() => {
    if (!isLoaded) return;

    if (!isAuthenticated) {
      router.replace("/signin");
    }
  }, [isLoaded, isAuthenticated, router]);

  if (!isLoaded || !isAuthenticated) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="text-[var(--muted)]">Checking your sign-in status...</p>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="text-6xl">🛒</div>

        <h1 className="mt-6 text-3xl font-bold">Your cart is empty</h1>

        <p className="mt-3 text-[var(--muted)]">
          Add some dishes before continuing to checkout.
        </p>

        <Link
          href="/menu"
          className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-white"
        >
          Explore Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          Addis Eats
        </p>

        <h1 className="mt-2 text-4xl font-bold">Checkout</h1>

        <p className="mt-3 text-[var(--muted)]">
          Welcome, {user.username}. Complete your order below.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">Delivery Information</h2>

          <div className="mt-6">
            <CheckoutForm />
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span className="font-semibold">
                  {item.price * item.quantity} ETB
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-5">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total</span>

              <span className="text-xl font-bold text-[var(--primary)]">
                {cartTotal} ETB
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CheckoutPage;
