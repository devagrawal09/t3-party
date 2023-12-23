import { currentUser } from "@clerk/nextjs";
import { Order, progressOrder } from "~/app/(_domain)";
import { getOrder, setOrder } from "~/app/db";
import OrderViewClient from "./order-view-client";
import { Plug, emitPlug, getPlug } from "~/plugjs/server";

export async function updateOrderView(orderId: string, order: Order) {
  await emitPlug(`order:${orderId}`, order);
}

export default async function OrderPage({ orderId }: { orderId: string }) {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  const order =
    (await getPlug<Order>(`order:${orderId}`)) || (await getOrder(orderId));

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== user.id) {
    throw new Error("Order not found");
  }

  return (
    <Plug on={`order:${orderId}`} init={order}>
      <div className="flex flex-col gap-4">
        <OrderViewClient
          user={{
            name: user.firstName || `anon`,
            email: user.emailAddresses[0]?.emailAddress || `anon`,
          }}
          cancelOrder={async (orderId: string) => {
            "use server";

            const updatedOrder = await progressOrder(
              getOrder,
              setOrder,
            )(orderId);
            updateOrderView(orderId, updatedOrder);
          }}
        />
      </div>
    </Plug>
  );
}
