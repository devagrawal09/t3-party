import Link from "next/link";

import type { Order } from "~/app/(_domain)";

export default function OrderViewServer({
  user,
  cancelOrder,
  order: serverOrder,
}: {
  order: Order;
  user: { name: string; email: string };
  cancelOrder: (orderId: string) => Promise<void>;
}) {
  const { data: clientOrder } = { data: {} };

  const order = serverOrder || clientOrder;

  return (
    <>
      <h1 className="text-xl">
        Order (
        {order.id
          .split("")
          .slice(order.id.length - 3, order.id.length)
          .join("")}
        ):{" "}
        <span className="font-semibold text-amber-800">
          {order.coffee.name}
        </span>
      </h1>
      <p>
        <span className="font-semibold">Name:</span> {user.name}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {user.email}
      </p>
      <p>
        <span className="font-semibold">
          <span className="font-semibold text-amber-800">{order.status}</span>
        </span>
      </p>
      <p className="mt-4">
        <Link href="/orders">All Orders</Link>
      </p>
    </>
  );
}
