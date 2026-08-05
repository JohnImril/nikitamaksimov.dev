"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { SignalCluster } from "@/content/projects";

type SignalState = {
  active: SignalCluster[];
  setActive: (clusters: SignalCluster[]) => void;
};
const Context = createContext<SignalState>({
  active: [],
  setActive: () => undefined,
});

export function SignalMapProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<SignalCluster[]>([]);
  return (
    <Context.Provider value={{ active, setActive }}>
      {children}
    </Context.Provider>
  );
}

export function useSignalMap() {
  return useContext(Context);
}
