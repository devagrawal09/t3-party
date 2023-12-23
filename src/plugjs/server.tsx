import { PARTYKIT_HOST, PARTYKIT_URL } from "~/env.mjs";
import { ClientSubscription } from "./client";
import { PlugProvider } from "./context";

export async function emitPlug(id: string, message?: any) {
  await fetch(`${PARTYKIT_URL}/party/${id}`, {
    method: "POST",
    body: JSON.stringify(message ? message : { type: "refresh" }),
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 0,
    },
  });
}

export async function getPlug<D = any>(id: string) {
  const res = await fetch(`${PARTYKIT_URL}/party/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    return (await res.json()) as D;
  }
}

export function Plug(props: {
  on: string;
  children?: React.ReactNode;
  init?: any;
  onConnect?: () => void;
}) {
  const token = `${props.on}`;
  return (
    <PlugProvider init={props.init}>
      <ClientSubscription url={PARTYKIT_HOST} token={token}>
        {props.children}
      </ClientSubscription>
    </PlugProvider>
  );
}
