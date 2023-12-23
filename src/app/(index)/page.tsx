import { Suspense } from "react";
import Link from "next/link";
import { setTimeout } from "timers/promises";
import { getCoffees } from "../db";

const DELAYS = Number(process.env.DELAYS || 0);

export default function Home() {
  return (
    <>
      <Suspense fallback={<p>Loading Catalog...</p>}>
        <Catalog />
      </Suspense>
      <p className="mt-10 text-center">
        <Link href="/orders" className="hover:underline">
          Orders View
        </Link>
        {" | "}
        <Link href="/barista" className="hover:underline">
          Barista View
        </Link>
        {" | "}
        <Link href="/tv" className="hover:underline">
          TV View
        </Link>
      </p>
    </>
  );
}

async function Catalog() {
  await setTimeout(DELAYS);

  const coffees = await getCoffees();

  return (
    <ul>
      {coffees.map((coffee) => (
        <li
          className="m-2 flex justify-between gap-4 border p-3"
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
