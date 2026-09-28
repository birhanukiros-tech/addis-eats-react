"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useOrders } from "../../components/OrderProvider";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const { getOrderById, isLoaded } = useOrders();

  if (!isLoaded) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <p className="text-[var(--muted)]">Loading order...</p>
        </div>
      </section>
    );
  }

  const order = orderId ? getOrderById(orderId) : null;

  if (!order) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <div className="text-5xl">📦</div>

          <h1 className="mt-5 text-3xl font-bold">Order Not Found</h1>

          <p className="mt-3 text-[var(--muted)]">
            We couldn't find the order you're looking for.
          </p>

          <Link
            href="/orders"
            className="mt-6 inline-block rounded-lg bg-[var(--primary)] px-6 py-3 font-semibold text-white"
          >
            View My Orders
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-2xl border bg-white p-8 shadow-sm sm:p-10">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
            ✓
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
            Addis Eats
          </p>

          <h1 className="mt-2 text-4xl font-bold">Order Confirmed!</h1>

          <p className="mt-3 text-[var(--muted)]">
            Thank you for your order. We are preparing it now.
          </p>
        </div>

        <div className="mt-8 rounded-xl bg-gray-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500">Order ID</span>

            <span className="font-bold">{order.id}</span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500">Status</span>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
              {order.status}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500">Total</span>

            <span className="font-bold text-[var(--primary)]">
              {order.total} ETB
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/orders"
            className="rounded-lg bg-[var(--primary)] px-6 py-3 text-center font-semibold text-white"
          >
            View My Orders
          </Link>

          <Link
            href="/menu"
            className="rounded-lg border border-[var(--primary)] px-6 py-3 text-center font-semibold text-[var(--primary)]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
            <p className="text-[var(--muted)]">Loading confirmation...</p>
          </div>
        </section>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}

export default OrderConfirmationPage;
