import { PARTYKIT_HOST, PARTYKIT_URL } from "~/env.mjs";
import { ClientSubscription, PlugMessage } from "./client";

export function createPartyPlug() {
  async function revalidatePlug<D = any>(id: string, message?: D) {
    const payload: PlugMessage<D> = message
      ? { type: "data", data: message }
      : { type: "empty" };

    await fetch(`${PARTYKIT_URL}/party/${id}`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 0,
      },
    });
  }

  async function fetchPlug<D = any>(id: string) {
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

  function Plug(props: {
    on: string;
    children?: React.ReactNode;
    init?: any;
    onConnect?: () => void;
    revalidatePage?: boolean;
  }) {
    const token = `${props.on}`;

    return (
      <ClientSubscription
        url={PARTYKIT_HOST}
        token={token}
        init={props.init}
        revalidatePage={props.revalidatePage}
      >
        {props.children}
      </ClientSubscription>
    );
  }

  return { revalidatePlug, fetchPlug, Plug };
}
