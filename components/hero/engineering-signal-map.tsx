"use client";

import { useEffect, useRef } from "react";
import { useSignalMap } from "./signal-map-context";
import { animationShouldRun } from "@/lib/motion";

type Point = { x: number; y: number; cluster: number };
const keys = ["architecture", "performance", "realtime", "ai"] as const;

function buildPoints(width: number, height: number, mobile: boolean): Point[] {
  const centers = [
    [0.2, 0.26],
    [0.72, 0.22],
    [0.3, 0.72],
    [0.76, 0.7],
  ];
  const spokes = mobile ? 2 : 4;
  return centers.flatMap(([cx, cy], cluster) =>
    Array.from({ length: spokes + 1 }, (_, i) => ({
      x: width * (cx + (i ? Math.cos(i * 2.1 + cluster) * 0.085 : 0)),
      y: height * (cy + (i ? Math.sin(i * 2.1 + cluster) * 0.11 : 0)),
      cluster,
    })),
  );
}

export function EngineeringSignalMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { active } = useSignalMap();
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d");
    if (!context) return undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return undefined;
    let frame = 0,
      visible = true,
      inViewport = true;
    const start = performance.now();
    let pointer = { x: -1000, y: -1000 };
    let points: Point[] = [];
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = buildPoints(rect.width, rect.height, rect.width < 640);
    };
    const draw = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);
      const highlighted = activeRef.current;
      context.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          if (!(a.cluster === b.cluster || (i % 5 === 0 && j % 5 === 0)))
            continue;
          const isActive =
            highlighted.includes(keys[a.cluster]) ||
            highlighted.includes(keys[b.cluster]);
          context.strokeStyle = isActive
            ? "rgba(139,168,255,.68)"
            : "rgba(170,185,210,.18)";
          context.lineWidth = isActive ? 1.45 : 1;
          context.beginPath();
          context.moveTo(a.x, a.y);
          const mx = (a.x + b.x) / 2,
            my = (a.y + b.y) / 2;
          const distance = Math.hypot(pointer.x - mx, pointer.y - my);
          const pull = Math.max(0, 1 - distance / 220) * 28;
          const angle = Math.atan2(pointer.y - my, pointer.x - mx);
          context.quadraticCurveTo(
            mx + Math.cos(angle) * pull,
            my + Math.sin(angle) * pull,
            b.x,
            b.y,
          );
          context.stroke();
        }
      }
      points.forEach((point, index) => {
        const isCenter = index % (rect.width < 640 ? 3 : 5) === 0;
        const isActive = highlighted.includes(keys[point.cluster]);
        context.fillStyle = isActive
          ? "#c2ceff"
          : isCenter
            ? "#839bd9"
            : "rgba(180,195,220,.4)";
        context.beginPath();
        context.arc(point.x, point.y, isCenter ? 3.5 : 1.8, 0, Math.PI * 2);
        context.fill();
        if (isCenter) {
          if (isActive) {
            const pulse = 10 + Math.sin(now / 520 + point.cluster) * 2;
            context.strokeStyle = "rgba(139,168,255,.48)";
            context.lineWidth = 1.25;
            context.beginPath();
            context.arc(point.x, point.y, pulse, 0, Math.PI * 2);
            context.stroke();
          }
        }
      });
      const centers = points.filter(
        (_, i) => i % (rect.width < 640 ? 3 : 5) === 0,
      );
      centers.forEach((a, i) => {
        const b = centers[(i + 1) % centers.length];
        const t = ((now - start) / 4200 + i * 0.23) % 1;
        const x = a.x + (b.x - a.x) * t,
          y = a.y + (b.y - a.y) * t;
        context.fillStyle = "rgba(177,164,255,.95)";
        context.shadowColor = "rgba(139,168,255,.7)";
        context.shadowBlur = 8;
        context.beginPath();
        context.arc(x, y, 2.8, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
      });
      if (
        animationShouldRun({
          reducedMotion: media.matches,
          documentVisible: visible,
          inViewport,
        })
      )
        frame = requestAnimationFrame(draw);
    };
    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible && inViewport) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(draw);
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport && visible) {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(draw);
        } else cancelAnimationFrame(frame);
      },
      { threshold: 0.05 },
    );
    resize();
    observer.observe(canvas);
    canvas.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="engineering-map" aria-hidden="true" />
  );
}
