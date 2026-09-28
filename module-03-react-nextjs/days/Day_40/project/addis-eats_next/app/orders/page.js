"use client";

import Link from "next/link";
import { useAuth } from "../../components/AuthProvider";
import { useOrders } from "../../components/OrderProvider";

function OrdersPage() {
  const { user, isLoaded: authLoaded } = useAuth();
  const { orders, isLoaded: ordersLoaded } = useOrders();

  if (!authLoaded || !ordersLoaded) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-[var(--muted)]">Loading your orders...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">Sign In Required</h1>

        <p className="mt-3 text-[var(--muted)]">
          Please sign in to view your order history.
        </p>

        <Link
          href="/signin"
          className="mt-6 inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-white"
        >
          Sign In
        </Link>
      </section>
    );
  }

  const customerOrders = orders.filter(
    (order) => order.customer.username === user.username,
  );

  if (customerOrders.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <div className="text-6xl">📦</div>

        <h1 className="mt-6 text-3xl font-bold">No Orders Yet</h1>

        <p className="mt-3 text-[var(--muted)]">
          You have not placed any orders yet.
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
    <section className="mx-auto max-w-5xl px-6 py-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          Addis Eats
        </p>

        <h1 className="mt-2 text-4xl font-bold">My Orders</h1>

        <p className="mt-3 text-[var(--muted)]">
          View your previous Addis Eats orders.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {customerOrders.map((order) => (
          <article
            key={order.id}
            className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-[var(--muted)]">Order ID</p>

                <h2 className="mt-1 font-mono font-bold">{order.id}</h2>

                <p className="mt-2 text-sm text-[var(--muted)]">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="text-left md:text-right">
                <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                  {order.status}
                </span>

                <p className="mt-2 text-xl font-bold text-[var(--primary)]">
                  {order.total} ETB
                </p>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-bold">Items</h3>

              <div className="mt-3 space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span className="font-semibold">
                      {item.price * item.quantity} ETB
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t pt-5">
              <p className="text-sm font-semibold">Delivery Address</p>

              <p className="mt-1 text-sm text-[var(--muted)]">
                {order.deliveryAddress}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OrdersPage;
