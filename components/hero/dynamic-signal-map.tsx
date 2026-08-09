"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const EngineeringSignalMap = dynamic(
  () =>
    import("./engineering-signal-map").then(
      (module) => module.EngineeringSignalMap,
    ),
  { ssr: false },
);

export function DynamicSignalMap() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const windowWithIdleCallback = window as Window & {
      requestIdleCallback?: (callback: () => void) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const idleHandle = windowWithIdleCallback.requestIdleCallback?.(
      () => setReady(true),
    );
    const timeoutHandle = window.setTimeout(() => setReady(true), 1200);

    return () => {
      if (idleHandle !== undefined) {
        windowWithIdleCallback.cancelIdleCallback?.(idleHandle);
      }
      window.clearTimeout(timeoutHandle);
    };
  }, []);

  return ready ? <EngineeringSignalMap /> : null;
}
