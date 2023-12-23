"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function OrderError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log({ error });
  }, [error]);

  return (
    <div className="flex flex-col gap-2">
      <h2>{error.message}</h2>
      <Link
        href="/"
        className="rounded bg-blue-400 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
