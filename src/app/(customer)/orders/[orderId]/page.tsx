import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { setTimeout } from "timers/promises";
import { getOrder } from "~/app/db";
import { Plug } from "~/plugjs/server";
import { currentUser } from "@clerk/nextjs";

const DELAYS = Number(process.env.DELAYS || 0);

export default async function OrderPage({
  params: { orderId },
}: {
  params: { orderId: string };
}) {
  return (
    <div className="flex flex-col gap-4">
      <Plug on={`orders:${orderId}`} />
      <Suspense>
        <OrderComponent orderId={orderId} />
      </Suspense>
    </div>
  );
}

async function OrderComponent({ orderId }: { orderId: string }) {
  await setTimeout(DELAYS);

  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  const order = await getOrder(orderId);

  if (!order) {
    redirect("/");
  }

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
        <span className="font-semibold">Name:</span> {user.firstName}
      </p>
      <p>
        <span className="font-semibold">Email:</span>{" "}
        {user.emailAddresses[0]?.emailAddress}
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
