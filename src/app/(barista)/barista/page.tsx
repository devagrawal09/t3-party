import { currentUser } from "@clerk/nextjs";
import { Plug, emitPlug, getPlug } from "~/plugjs/server";
import { progressOrder } from "~/app/(_domain)";
import { getOrders, getOrder, setOrder } from "~/app/db";
import BaristaView from "./barista-view-client";

async function progressOrderAction(orderId: string) {
  "use server";

  await progressOrder(getOrder, setOrder)(orderId);

  await emitPlug("baristaOrders");
}

export default async function BaristaPage() {
  const user = (await currentUser())!;

  if (user.publicMetadata.role !== "barista") {
    throw new Error("User not barista");
  }

  const orders = (await getPlug(`baristaOrders`)) || (await getOrders());

  return (
    <Plug on="baristaOrders">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl">Hello Barista!</h1>
        <BaristaView orders={orders} progressOrder={progressOrderAction} />
      </div>
    </Plug>
  );
}
