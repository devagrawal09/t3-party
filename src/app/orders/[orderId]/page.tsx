import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { setTimeout } from "timers/promises";
import { getOrder } from "~/app/db";
import { Plug } from "~/plugjs/server";

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

  const order = await getOrder(orderId);
  const user = { name: "Dev Agrawal", email: "dev@clerk.dev" };

  if (!order) {
    redirect("/");
  }

  return (
    <>
      <h1 className="text-xl">
        Order:{" "}
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
