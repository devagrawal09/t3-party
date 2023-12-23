"use client";

import { createContext, useContext, useState } from "react";

const context = createContext({
  data: null as any,
  setData: (data: any) => {},
});

export function PlugProvider({
  init,
  children,
}: {
  init?: any;
  children: React.ReactNode;
}) {
  const [data, setData] = useState(init);
  console.log({ data });
  return (
    <context.Provider value={{ data, setData }}>{children}</context.Provider>
  );
}

export function usePlug<D>() {
  return useContext(context) as { data: D; setData: (data: D) => void };
}
