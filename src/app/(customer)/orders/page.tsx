import { Suspense } from "react";
import Link from "next/link";
import { setTimeout } from "timers/promises";
import { getOrders } from "../../db";
import { Plug } from "~/plugjs/server";
import { auth, currentUser } from "@clerk/nextjs";

const DELAYS = Number(process.env.DELAYS || 0);

export default function CustomerOrdersPage() {
  console.log(`OrdersPage`);

  const { userId } = auth().protect();

  return (
    <div className="flex flex-col gap-4">
      <Plug on={`customerOrders:${userId}`} />
      <h1 className="text-xl">Hello Customer!</h1>
      <Suspense fallback={<p className="mb-4">Loading Orders...</p>}>
        <CustomerOrdersComponent />
      </Suspense>
    </div>
  );
}

async function CustomerOrdersComponent() {
  await setTimeout(DELAYS);

  const { userId } = auth().protect();

  const orders = await getOrders({ userId });

  const user = (await currentUser())!;

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
          <Link href={`/orders/${order.id}`} key={order.id}>
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
                <span className="font-semibold">Name:</span> {user.firstName}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {user.emailAddresses[0]?.emailAddress}
              </p>
              <p>
                <span className="font-semibold">{order.status}</span>
              </p>
            </li>
          </Link>
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
