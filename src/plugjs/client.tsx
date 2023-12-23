"use client";

import { useRouter } from "next/navigation";
import usePartySocket from "partysocket/react";
import { PARTYKIT_HOST } from "~/env.mjs";

export function ClientSubscription({
  url,
  token,
  children,
}: {
  children?: React.ReactNode;
  url: string;
  token: string;
}) {
  const router = useRouter();
  // const [authenticated, setAuthenticated] = useState(false);

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    room: token,
    onMessage(event) {
      const message = JSON.parse(event.data);
      if (message) {
        console.log("message", message);

        if (message.type === "refresh") {
          router.refresh();
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
  console.log("ClientSubscription", url, token);

  // useEffect(() => {
  //   if (!readyState) return;
  //   if (authenticated) return;

  //   if (readyState === 1) {
  //     console.log("sending token", token);
  //     sendJsonMessage<ClientMessage>({ token });
  //     setAuthenticated(true);
  //   }
  // }, [token, readyState, authenticated, sendJsonMessage]);

  return <>{children}</>;
}
