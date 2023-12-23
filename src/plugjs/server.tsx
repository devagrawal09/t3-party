import { PARTYKIT_HOST, PARTYKIT_URL } from "~/env.mjs";
import { ClientSubscription } from "./client";

export async function emitTo(id: string, message: any) {
  await fetch(`${PARTYKIT_URL}/party/${id}`, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 0,
    },
  });
}

export function Plug(props: { on: string; children?: React.ReactNode }) {
  const token = `${props.on}`;
  return (
    <ClientSubscription url={PARTYKIT_HOST} token={token}>
      {props.children}
    </ClientSubscription>
  );
}
