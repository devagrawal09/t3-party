import { Suspense } from "react";
import Link from "next/link";
import { getOrders } from "../../db";
import { Plug, emitPlug } from "~/plugjs/server";
import { auth, currentUser } from "@clerk/nextjs";

export async function updateCustomerView(userId: string) {
  emitPlug(`customerOrders:${userId}`);
}

export default async function CustomerOrdersPage() {
  console.log(`OrdersPage`);

  const user = (await currentUser())!;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">Hello Customer!</h1>
      <p>
        {user.firstName} ({user.emailAddresses[0]?.emailAddress})
      </p>
      <Suspense fallback={<p className="mb-4">Loading Orders...</p>}>
        <CustomerLiveView />
      </Suspense>
    </div>
  );
}

async function CustomerLiveView() {
  const { userId } = auth().protect();

  const orders = await getOrders({ userId });

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
    <Plug on={`customerOrders:${userId}`} init={orders}>
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
                </span>{" "}
                (
                {order.id
                  .split("")
                  .slice(order.id.length - 3, order.id.length)
                  .join("")}
                )
              </h2>
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
    </Plug>
  );
}
