import Link from "next/link";

export default function Home() {
  return (
    <p className="mt-10 text-center">
      <Link href="/order" className="hover:underline">
        Place Order
      </Link>
      {" | "}
      <Link href="/barista" className="hover:underline">
        Barista View
      </Link>
    </p>
  );
}
