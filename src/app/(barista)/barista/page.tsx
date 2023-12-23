import { Suspense } from "react";
import { setTimeout } from "timers/promises";
import { getOrder, getOrders, setOrder } from "../../db";
import { progressOrder } from "../../(_domain)";
import { Plug, emitTo } from "~/plugjs/server";
import { currentUser } from "@clerk/nextjs";
import { emit } from "process";

const DELAYS = Number(process.env.DELAYS || 0);

export default function BaristaPage() {
  console.log(`BaristaPage`);

  return (
    <div className="flex flex-col gap-4">
      <Plug on="baristaOrders" />

      <h1 className="text-xl">Hello Barista!</h1>
      <Suspense fallback={<p className="mb-4">Loading Orders...</p>}>
        <BaristaView />
      </Suspense>
    </div>
  );
}

async function BaristaView() {
  await setTimeout(DELAYS);

  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  if (user.publicMetadata.role !== "barista") {
    throw new Error("User not barista");
  }

  const orders = await getOrders();

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
            </span>
          </h2>
          <p>
            <span className="font-semibold">{order.status}</span>
          </p>
          <form
            action={async function () {
              "use server";
              await setTimeout(DELAYS);

              await progressOrder(getOrder, setOrder)(order.id);

              emitTo("baristaOrders");
              emitTo(`orders:${order.id}`);
              emitTo(`customerOrders:${order.userId}`);
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
