"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animationShouldRun } from "@/lib/motion";
import type { SignalMapController } from "./engineering-signal-map";

export function DynamicSignalMap({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const syncRef = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);
  const [controlsAvailable, setControlsAvailable] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inViewport = false;
    let disposed = false;
    let loading = false;
    let controller: SignalMapController | undefined;

    const sync = () => {
      setControlsAvailable(!media.matches && Boolean(controller));
      const allowed =
        !pausedRef.current &&
        animationShouldRun({
          reducedMotion: media.matches,
          documentVisible: document.visibilityState === "visible",
          inViewport,
        });
      if (!allowed) {
        controller?.stop();
        if (media.matches) controller?.reset();
        return;
      }
      if (controller) controller.start();
      else if (!loading) {
        loading = true;
        void import("./engineering-signal-map")
          .then((module) => {
            if (disposed) return;
            controller = module.enhanceSignalMap(host);
            sync();
          })
          .catch(() => {
            // The complete static illustration remains usable if the chunk fails.
            if (!disposed) host.dataset.motion = "static";
          });
      }
    };
    syncRef.current = sync;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(host);
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      syncRef.current = () => {};
      observer.disconnect();
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      controller?.dispose();
    };
  }, []);
  return (
    <div className="signal-map" ref={hostRef} data-motion="static">
      {children}
      {controlsAvailable ? (
        <button
          className="map-motion-control"
          type="button"
          aria-pressed={paused}
          onClick={() => {
            pausedRef.current = !pausedRef.current;
            setPaused(pausedRef.current);
            syncRef.current();
          }}
        >
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      ) : null}
    </div>
  );
}
