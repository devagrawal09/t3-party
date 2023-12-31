"use client";

import { useRouter } from "next/navigation";

export function BackButton(props: any) {
  const router = useRouter();

  return (
    <button
      {...props}
      onClick={() => {
        router.back();
      }}
    />
  );
}
