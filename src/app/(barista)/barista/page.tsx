// import { currentUser } from "@clerk/nextjs";
import { createPartyPlug } from "~/plugjs/server";
import { progressOrder } from "~/app/(_domain)";
import { getOrders, getOrder, setOrder } from "~/app/db";
import BaristaView from "./barista-view-client";
import { updateOrderView } from "~/app/(customer)/orders/[orderId]/page";
import { updateCustomerView } from "~/app/(customer)/orders/page";

const { revalidatePlug, fetchPlug, Plug } = createPartyPlug();

async function progressOrderAction(orderId: string) {
  "use server";

  const updated = await progressOrder(getOrder, setOrder)(orderId);

  await Promise.all([
    updateBaristaView(),
    updateOrderView(orderId, updated),
    updateCustomerView(updated.userId),
  ]);
}

export default async function BaristaPage() {
  // const user = (await currentUser())!;

  // if (user.publicMetadata.role !== "barista") {
  //   throw new Error("User not barista");
  // }

  const orders = (await fetchPlug(`baristaOrders`)) || (await getOrders());

  return (
    <Plug on="baristaOrders">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl">Hello Barista!</h1>
        <BaristaView orders={orders} progressOrder={progressOrderAction} />
      </div>
    </Plug>
  );
}

export async function updateBaristaView() {
  "use server";

  await revalidatePlug("baristaOrders", await getOrders());
}
