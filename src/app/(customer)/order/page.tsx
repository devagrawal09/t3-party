import { Suspense } from "react";
import { redirect } from "next/navigation";
import { setTimeout } from "timers/promises";
import Link from "next/link";
import { getCoffee, getCoffees } from "../../db";
import { placeOrder } from "../../(_domain)";
import { auth, currentUser } from "@clerk/nextjs";
import { createPartyPlug } from "~/plugjs/server";
import { BackButton } from "./back";

const { revalidatePlug } = createPartyPlug();

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
      <BackButton className="bg-red-400 p-2">Back</BackButton>
    </>
  );
}

async function OrderForm({ coffeeId }: { coffeeId?: string }) {
  await setTimeout(DELAYS);

  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }

  if (!coffeeId) {
    return <Catalog />;
  }

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

        const { userId } = auth();

        const code = Number(formData.get("code")?.toString() || 0);

        if (!coffee || !userId) {
          throw new Error("Missing data");
        }

        const order = await placeOrder({ code, coffee, userId });

        revalidatePlug("orders", "");

        redirect(`/orders/${order.id}`);
      }}
    >
      <h1 className="text-xl">
        Order:{" "}
        <span className="font-semibold text-amber-800">{coffee.name}</span>
      </h1>
      <span className="text-gray-500">
        Contact:{" "}
        <span className="font-semibold text-amber-800">
          {user.emailAddresses[0]?.emailAddress || "anonymous"}
        </span>
      </span>
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

async function Catalog() {
  await setTimeout(DELAYS);

  const coffees = await getCoffees();

  return (
    <ul className="mb-4">
      {coffees.map((coffee) => (
        <li
          className="my-2 flex justify-between gap-4 border p-3"
          key={coffee.id}
        >
          <h2>{coffee.name}</h2>
          <Link href={`/order?coffee=${coffee.id}`} className="bg-blue-300 p-2">
            Order
          </Link>
        </li>
      ))}
    </ul>
  );
}
