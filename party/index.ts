import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly party: Party.Party) {}

  state: any;

  async onRequest(req: Party.Request) {
    console.log("socket request", req.url);
    if (req.method === "POST") {
      const data = (await req.json()) as any;
      console.log("socket data", data);
      if (data.type === "refresh") {
        this.state = undefined;
        this.party.broadcast(JSON.stringify({ type: "refresh" }));
      } else {
        this.state = data;
        this.party.broadcast(JSON.stringify(data));
      }
      return new Response("ok", { status: 200 });
    }

    if (req.method === "GET") {
      if (!this.state) return new Response("not found", { status: 404 });
      return new Response(JSON.stringify(this.state), { status: 200 });
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
    const remaining = [...this.party.getConnections()].length;
    console.log("remaining", remaining);
    if (remaining === 0) {
      console.log("resetting state");
      this.state = undefined;
    }
  }
}

Server satisfies Party.Worker;
