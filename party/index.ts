import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly party: Party.Party) {}

  async onRequest(req: Party.Request) {
    console.log("socket request", req.url);
    if (req.method === "POST") {
      this.party.broadcast(JSON.stringify({ type: "refresh" }));
    }

    return new Response("ok", { status: 200 });
  }

  onConnect(
    connection: Party.Connection<unknown>,
    ctx: Party.ConnectionContext,
  ): void | Promise<void> {
    console.log("socket connected");
  }

  onMessage(
    message: string | ArrayBuffer | ArrayBufferView,
    sender: Party.Connection<unknown>,
  ): void | Promise<void> {
    console.log("socket message");
  }

  onClose(connection: Party.Connection<unknown>): void | Promise<void> {
    console.log("socket disconnected");
  }
}

Server satisfies Party.Worker;
