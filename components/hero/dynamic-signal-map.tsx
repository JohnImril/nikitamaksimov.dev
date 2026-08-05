"use client";

import dynamic from "next/dynamic";

const EngineeringSignalMap = dynamic(
  () =>
    import("./engineering-signal-map").then(
      (module) => module.EngineeringSignalMap,
    ),
  { ssr: false },
);

export function DynamicSignalMap() {
  return <EngineeringSignalMap />;
}
