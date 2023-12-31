"use client";

import { useRouter } from "next/navigation";
import usePartySocket from "partysocket/react";
import { createContext, useContext, useState } from "react";

export type ClientProps<D> = {
  children?: React.ReactNode;
  url: string;
  init?: D;
  token: string;
  revalidatePage?: boolean;
};

export type PlugMessage<D> = { type: "empty" } | { type: "data"; data: D };

export function ClientSubscription<D = any>({
  url,
  token,
  init,
  children,
  revalidatePage,
}: ClientProps<D>) {
  const router = useRouter();
  const [data, setData] = useState(init);

  const socket = usePartySocket({
    host: url,
    room: token,
    onMessage(event) {
      const message: PlugMessage<D> = JSON.parse(event.data);
      if (message) {
        console.log("message", message);

        if (revalidatePage) {
          router.refresh();
        } else if (message.type === "data") {
          setData(message.data);
        }
      }
    },
    onOpen() {
      console.log("socket opened");
    },
    onClose() {
      console.log("socket closed");
    },
    onError() {
      console.log("socket error");
    },
  });

  return (
    <context.Provider value={{ data, setData }}>{children}</context.Provider>
  );
}

const context = createContext({
  data: null as any,
  setData: (data: any) => {},
});

export function usePlug<D>() {
  return useContext(context) as { data: D; setData: (data: D) => void };
}
