"use client";

import type { Order } from "~/app/(_domain)";
import { usePlug } from "~/plugjs/context";

export default function BaristaView({
  orders: serverOrders,
  progressOrder,
}: {
  orders: Order[];
  progressOrder: (orderId: string) => Promise<void>;
}) {
  const { data: clientOrders } = usePlug<Order[]>();

  const orders = clientOrders || serverOrders;

  return (
    <ul>
      {orders.map((order) => (
        <li
          className="m-2 flex justify-between gap-4 border p-3"
          key={order.id}
        >
          <h2>
            <span className="font-semibold text-amber-800">
              {order.coffee.name}
            </span>{" "}
            (
            {order.id
              .split("")
              .slice(order.id.length - 3, order.id.length)
              .join("")}
            )
          </h2>
          <p>{order.userId}</p>
          <p>
            <span className="font-semibold">{order.status}</span>
          </p>
          <form
            action={async function () {
              // "use socket"

              await progressOrder(order.id);
            }}
          >
            <button
              type="submit"
              className={`px-2 py-1 ${
                order.status === "pending"
                  ? "bg-blue-300"
                  : order.status === "confirmed"
                    ? "bg-green-300"
                    : order.status === "prepared"
                      ? "bg-yellow-300"
                      : "bg-red-300"
              }`}
            >
              {order.status === "pending"
                ? "Confirm"
                : order.status === "confirmed"
                  ? "Prepare"
                  : order.status === "prepared"
                    ? "Pick up"
                    : "Reset"}
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
