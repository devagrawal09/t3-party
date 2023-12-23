import { Suspense } from "react";
import { redirect } from "next/navigation";
import { setTimeout } from "timers/promises";
import Link from "next/link";
import { getCoffee } from "../db";
import { placeOrder } from "../domain";

const DELAYS = Number(process.env.DELAYS || 0);

export default function OrderPage({
  searchParams,
}: {
  searchParams: { coffee: string };
}) {
  return (
    <>
      <Suspense fallback={<p className="mb-4">Loading Order Form...</p>}>
        <OrderForm coffeeId={searchParams.coffee} />
      </Suspense>
      <Link href="/" className="mt-4 bg-red-400 p-2">
        Back
      </Link>
    </>
  );
}

async function OrderForm({ coffeeId }: { coffeeId: string }) {
  await setTimeout(DELAYS);

  const coffee = await getCoffee(coffeeId);

  if (!coffee) {
    throw new Error("Coffee not found");
  }

  return (
    <form
      className="mb-4 flex flex-col gap-4"
      action={async function (formData: FormData) {
        "use server";
        await setTimeout(DELAYS);

        const userId = formData.get("userId")?.toString() || "anonymous";
        const code = Number(formData.get("code")?.toString() || 0);

        if (!coffee || !userId) {
          throw new Error("Missing name or email");
        }

        const order = await placeOrder({ code, coffee, userId });

        // emitTo("orders");

        redirect(`/orders/${order.id}`);
      }}
    >
      <h1 className="text-xl">
        Order:{" "}
        <span className="font-semibold text-amber-800">{coffee.name}</span>
      </h1>
      <input
        type="number"
        name="code"
        placeholder="Code"
        className="border border-gray-300 p-2"
        required
      />
      <button type="submit" className="bg-blue-300 p-2">
        Order
      </button>
    </form>
  );
}
