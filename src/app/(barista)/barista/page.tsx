// import { currentUser } from "@clerk/nextjs";
import { createPartyPlug } from "~/plugjs/server";
import { progressOrder } from "~/app/(_domain)";
import { getOrders, getOrder, setOrder } from "~/app/db";
import { updateOrderView } from "~/app/(customer)/orders/[orderId]/page";
import { updateCustomerView } from "~/app/(customer)/orders/page";

import BaristaView from "./barista-view-client";

const { revalidatePlug, Plug } = createPartyPlug();

async function progressOrderAction(orderId: string) {
  "use server";

  const updated = await progressOrder(getOrder, setOrder)(orderId);

  await Promise.all([
    revalidatePlug("baristaOrders"),
    updateOrderView(orderId, updated),
    updateCustomerView(updated.userId),
  ]);
}

export default async function BaristaPage() {
  // const user = (await currentUser())!;

  // if (user.publicMetadata.role !== "barista") {
  //   throw new Error("User not barista");
  // }
  const orders = await getOrders();

  return (
    <Plug on="baristaOrders" revalidatePage>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl">Hello Barista!</h1>
        <BaristaView orders={orders} progressOrder={progressOrderAction} />
      </div>
    </Plug>
  );
}
