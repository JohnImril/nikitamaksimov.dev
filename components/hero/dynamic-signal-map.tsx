"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const signalMapEvent = "signal-map:active";

const EngineeringSignalMap = dynamic(
  () =>
    import("./engineering-signal-map").then(
      (module) => module.EngineeringSignalMap,
    ),
  { ssr: false },
);

export function DynamicSignalMap() {
  const [ready, setReady] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = triggerRef.current?.parentElement;
    if (!container) return undefined;
    const activate = () => setReady(true);

    container.addEventListener("pointerenter", activate, { once: true });
    container.addEventListener("focusin", activate, { once: true });
    window.addEventListener(signalMapEvent, activate, { once: true });

    return () => {
      container.removeEventListener("pointerenter", activate);
      container.removeEventListener("focusin", activate);
      window.removeEventListener(signalMapEvent, activate);
    };
  }, []);

  return ready ? (
    <EngineeringSignalMap />
  ) : (
    <span ref={triggerRef} hidden aria-hidden="true" />
  );
}
