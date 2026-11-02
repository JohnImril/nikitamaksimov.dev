"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animationShouldRun } from "@/lib/motion";
import type { SculptureController } from "./engineering-sculpture";

export function DynamicSculpture({ children }: { children: ReactNode }) {
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
    let failed = false;
    let initializing = false;
    let initialize:
      typeof import("./engineering-sculpture").enhanceSculpture | undefined;
    let controller: SculptureController | undefined;

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
      else if (initialize && !failed && !initializing) {
        initializing = true;
        const create = initialize;
        void Promise.resolve()
          .then(() => (disposed ? undefined : create(host)))
          .then((created) => {
            if (!created) return;
            if (disposed) {
              created.dispose();
              return;
            }
            controller = created;
            initializing = false;
            sync();
          })
          .catch(() => {
            failed = true;
            if (!disposed) host.dataset.motion = "static";
          });
      } else if (!loading && !failed) {
        loading = true;
        void import("./engineering-sculpture")
          .then((module) => {
            if (disposed) return;
            initialize = module.enhanceSculpture;
            sync();
          })
          .catch(() => {
            // The rendered resting pose remains available without WebGL or JS.
            failed = true;
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
    host.addEventListener("sculpture:restored", sync);
    return () => {
      disposed = true;
      syncRef.current = () => {};
      observer.disconnect();
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      host.removeEventListener("sculpture:restored", sync);
      controller?.dispose();
    };
  }, []);
  return (
    <div className="kinetic-sculpture" ref={hostRef} data-motion="static">
      {children}
      {controlsAvailable ? (
        <button
          className="sculpture-motion-control"
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
