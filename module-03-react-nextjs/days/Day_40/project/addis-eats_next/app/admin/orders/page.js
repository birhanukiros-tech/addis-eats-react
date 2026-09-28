"use client";

import { useOrders } from "../../../components/OrderProvider";

const ORDER_STATUSES = [
  "Pending",
  "Preparing",
  "Ready",
  "Out for Delivery",
  "Delivered",
  "Declined",
  "Cancelled",
];

function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrders();

  return (
    <section className="px-8 py-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
          Management
        </p>

        <h1 className="mt-2 text-4xl font-bold">Orders</h1>

        <p className="mt-2 text-gray-500">
          Manage customer orders and delivery status.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-xl border bg-white p-12 text-center">
          <div className="text-5xl">📦</div>

          <h2 className="mt-4 text-2xl font-bold">No Orders Yet</h2>

          <p className="mt-2 text-gray-500">
            Customer orders will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left">Order</th>

                  <th className="px-5 py-4 text-left">Customer</th>

                  <th className="px-5 py-4 text-left">Items</th>

                  <th className="px-5 py-4 text-left">Total</th>

                  <th className="px-5 py-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-5 py-5">
                      <p className="font-mono text-sm font-bold">{order.id}</p>

                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <p className="font-semibold">{order.customer.fullName}</p>

                      <p className="mt-1 text-sm text-gray-500">
                        {order.customer.phone}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {order.deliveryAddress}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <div className="space-y-1 text-sm">
                        {order.items.map((item) => (
                          <p key={item.id}>
                            {item.name} × {item.quantity}
                          </p>
                        ))}
                      </div>
                    </td>

                    <td className="px-5 py-5 font-bold text-[var(--primary)]">
                      {order.total} ETB
                    </td>

                    <td className="px-5 py-5">
                      <select
                        value={order.status}
                        onChange={(event) =>
                          updateOrderStatus(order.id, event.target.value)
                        }
                        className="rounded-lg border px-3 py-2 text-sm font-semibold outline-none focus:border-[var(--primary)]"
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminOrdersPage;
