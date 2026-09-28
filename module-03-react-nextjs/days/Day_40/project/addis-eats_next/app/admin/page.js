"use client";

import Link from "next/link";
import { useOrders } from "../../components/OrderProvider";

function AdminDashboard() {
  const { orders } = useOrders();

  const totalOrders = orders.length;

  const totalSales = orders
    .filter((order) => order.status !== "Declined")
    .reduce((total, order) => total + Number(order.total || 0), 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending" || order.status === "Preparing",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered",
  ).length;

  /*
    Create sales data for the last 7 days.
  */
  const today = new Date();

  const salesData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);

    date.setDate(today.getDate() - (6 - index));

    const dateKey = date.toISOString().slice(0, 10);

    const sales = orders
      .filter((order) => {
        if (!order.createdAt) return false;

        const orderDate = new Date(order.createdAt).toISOString().slice(0, 10);

        return (
          orderDate === dateKey &&
          order.status !== "Declined" &&
          order.status !== "Cancelled"
        );
      })
      .reduce((total, order) => total + Number(order.total || 0), 0);

    return {
      date,
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      sales,
    };
  });

  const maxSales = Math.max(...salesData.map((item) => item.sales), 1);

  return (
    <section className="px-8 py-10">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          Overview
        </p>

        <h1 className="mt-2 text-4xl font-bold">Dashboard</h1>

        <p className="mt-2 text-[var(--muted)]">
          Welcome back. Here's what's happening with Addis Eats.
        </p>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {/* Orders */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Orders</p>

            <span className="text-2xl">📦</span>
          </div>

          <p className="mt-3 text-3xl font-bold">{totalOrders}</p>
        </div>

        {/* Pending */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Pending</p>

            <span className="text-2xl">⏳</span>
          </div>

          <p className="mt-3 text-3xl font-bold text-orange-600">
            {pendingOrders}
          </p>
        </div>

        {/* Delivered */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Delivered</p>

            <span className="text-2xl">✅</span>
          </div>

          <p className="mt-3 text-3xl font-bold text-green-600">
            {deliveredOrders}
          </p>
        </div>

        {/* Sales */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Sales</p>

            <span className="text-2xl">💰</span>
          </div>

          <p className="mt-3 text-3xl font-bold text-[var(--primary)]">
            {totalSales} ETB
          </p>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">Food Sales</h2>

            <p className="mt-1 text-sm text-gray-500">
              Sales over the last 7 days
            </p>
          </div>

          <div className="font-semibold text-[var(--primary)]">
            {totalSales} ETB total
          </div>
        </div>

        {/* Chart */}
        <div className="mt-8">
          <div className="flex h-72 items-end gap-3 border-b border-l px-4 pb-0 pt-6 sm:gap-6">
            {salesData.map((item) => {
              const height =
                item.sales === 0
                  ? 4
                  : Math.max((item.sales / maxSales) * 100, 8);

              return (
                <div
                  key={item.date.toISOString()}
                  className="flex h-full flex-1 flex-col justify-end"
                >
                  {/* Value */}
                  <div className="mb-2 text-center text-xs font-semibold text-gray-600">
                    {item.sales > 0 ? `${item.sales}` : ""}
                  </div>

                  {/* Bar */}
                  <div
                    className="w-full rounded-t-lg bg-[var(--primary)] transition-all hover:opacity-80"
                    style={{
                      height: `${height}%`,
                    }}
                    title={`${item.sales} ETB`}
                  />

                  {/* Day */}
                  <p className="mt-3 text-center text-xs font-medium text-gray-500">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-3 text-right text-xs text-gray-400">Sales in ETB</p>
        </div>
      </div>

      {/* Management cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/dishes"
          className="rounded-xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="text-3xl">🍽️</div>

          <h2 className="mt-4 text-2xl font-bold">Manage Dishes</h2>

          <p className="mt-2 text-gray-500">
            Add, edit, delete and manage menu availability.
          </p>

          <span className="mt-5 inline-block font-semibold text-[var(--primary)]">
            Open Dish Management →
          </span>
        </Link>

        <Link
          href="/admin/orders"
          className="rounded-xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="text-3xl">📦</div>

          <h2 className="mt-4 text-2xl font-bold">Manage Orders</h2>

          <p className="mt-2 text-gray-500">
            View orders and update delivery status.
          </p>

          <span className="mt-5 inline-block font-semibold text-[var(--primary)]">
            Open Order Management →
          </span>
        </Link>
      </div>
    </section>
  );
}

export default AdminDashboard;
