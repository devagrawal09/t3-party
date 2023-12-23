import { Suspense } from "react";
import Link from "next/link";
import { setTimeout } from "timers/promises";
import { getOrders } from "../db";
import { Plug } from "~/plugjs/server";

const DELAYS = Number(process.env.DELAYS || 0);

export default function OrdersPage() {
  console.log(`OrdersPage`);

  return (
    <div className="flex flex-col gap-4">
      <Plug on="orders" />

      <h1 className="text-xl">Hello Customer!</h1>
      <Suspense fallback={<p className="mb-4">Loading Orders...</p>}>
        <OrdersComponent />
      </Suspense>
    </div>
  );
}

async function OrdersComponent() {
  await setTimeout(DELAYS);

  const userId = "anonymous";
  const orders = await getOrders();
  const user = { name: "Dev Agrawal", email: "dev@clerk.dev" };

  if (!orders.length) {
    return (
      <p>
        There are no orders.{" "}
        <Link
          href="/"
          className="
          font-semibold
          text-amber-800
          hover:text-amber-600
          hover:underline
        "
        >
          Place an order
        </Link>
      </p>
    );
  }

  return (
    <>
      <ul>
        {orders.map((order) => (
          <li
            className="m-2 flex justify-between gap-4 border p-3"
            key={order.id}
          >
            <h2>
              <span className="font-semibold text-amber-800">
                {order.coffee.name}
              </span>
            </h2>
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">{order.status}</span>
            </p>
          </li>
        ))}
      </ul>
      <Link
        href="/"
        className="
          font-semibold
          text-amber-800
          hover:text-amber-600
          hover:underline
        "
      >
        Place an order
      </Link>
    </>
  );
}
