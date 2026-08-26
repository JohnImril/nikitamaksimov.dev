"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
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

  const value = useMemo(() => ({ active, setActive }), [active]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useSignalMap() {
  return useContext(Context);
}
