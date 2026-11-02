import {
  connections,
  facets,
  nodes,
  signalPosition,
  type Point,
} from "./signal-map-geometry";

export type SignalMapController = {
  start: () => void;
  stop: () => void;
  reset: () => void;
  dispose: () => void;
};

// No React renders or layout writes in the frame loop. Text and actions stay fixed.
export function enhanceSignalMap(host: HTMLDivElement): SignalMapController {
  const svg = host.querySelector("svg")!;
  const paths = Array.from(
    svg.querySelectorAll<SVGPathElement>(".map-lines path"),
  );
  const polygons = Array.from(
    svg.querySelectorAll<SVGPolygonElement>(".map-facets polygon"),
  );
  const dots = Array.from(svg.querySelectorAll<SVGGElement>(".map-nodes > g"));
  const signals = Array.from(
    svg.querySelectorAll<SVGGElement>(".map-signals > g"),
  );
  const orbits = svg.querySelector<SVGGElement>(".map-orbits")!;
  const pointer = { x: 360, y: 360, strength: 0, active: false };
  let frame = 0;
  let lastTime = 0;
  let seconds = 0;
  let running = false;

  function draw() {
    const points = nodes.map((node, index) => {
      const amplitude = node.hub ? 6 : 11;
      const phase = node.cluster * 1.7 + index * 0.38;
      return {
        x:
          node.x +
          Math.sin(seconds * 0.55 + phase) * amplitude * Math.min(seconds, 1),
        y:
          node.y +
          Math.sin(seconds * 0.43 + phase * 1.3) *
            amplitude *
            Math.min(seconds, 1),
      };
    });
    const controls: Point[] = [];
    paths.forEach((path, index) => {
      const [from, to] = connections[index];
      const a = points[from];
      const b = points[to];
      const x = (a.x + b.x) / 2;
      const y = (a.y + b.y) / 2;
      const influence =
        Math.max(0, 1 - Math.hypot(pointer.x - x, pointer.y - y) / 210) *
        pointer.strength;
      const control = {
        x: x + (pointer.x - x) * influence * 0.48,
        y: y + (pointer.y - y) * influence * 0.48,
      };
      controls.push(control);
      path.setAttribute(
        "d",
        `M${a.x.toFixed(2)},${a.y.toFixed(2)} Q${control.x.toFixed(2)},${control.y.toFixed(2)} ${b.x.toFixed(2)},${b.y.toFixed(2)}`,
      );
      path.style.strokeOpacity = String(0.42 + influence * 0.52);
    });
    dots.forEach((dot, index) =>
      dot.setAttribute(
        "transform",
        `translate(${points[index].x.toFixed(2)} ${points[index].y.toFixed(2)})`,
      ),
    );
    polygons.forEach((polygon, index) =>
      polygon.setAttribute(
        "points",
        facets[index]
          .map((id) => `${points[id].x.toFixed(2)},${points[id].y.toFixed(2)}`)
          .join(" "),
      ),
    );
    signals.forEach((signal, index) => {
      const point = signalPosition(index, seconds, points, controls);
      signal.setAttribute(
        "transform",
        `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`,
      );
    });
    orbits.setAttribute(
      "transform",
      `rotate(${Math.sin(seconds * 0.16) * 7} 360 360)`,
    );
  }
  function tick(now: number) {
    if (!running) return;
    const delta = lastTime ? Math.min(now - lastTime, 50) : 0;
    lastTime = now;
    seconds += delta / 1000;
    pointer.strength +=
      ((pointer.active ? 1 : 0) - pointer.strength) *
      (1 - Math.exp(-delta / 160));
    draw();
    frame = requestAnimationFrame(tick);
  }
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const rect = svg.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 720;
    pointer.y = ((event.clientY - rect.top) / rect.height) * 720;
    pointer.active = true;
  };
  const onLeave = () => {
    pointer.active = false;
  };
  svg.addEventListener("pointermove", onPointer, { passive: true });
  svg.addEventListener("pointerleave", onLeave);
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
    lastTime = 0;
    pointer.active = false;
    host.dataset.motion = "paused";
  };
  const reset = () => {
    seconds = 0;
    pointer.strength = 0;
    draw();
    host.dataset.motion = "static";
  };
  return {
    start() {
      if (running) return;
      running = true;
      lastTime = 0;
      host.dataset.motion = "running";
      frame = requestAnimationFrame(tick);
    },
    stop,
    reset,
    dispose() {
      stop();
      reset();
      svg.removeEventListener("pointermove", onPointer);
      svg.removeEventListener("pointerleave", onLeave);
    },
  };
}
