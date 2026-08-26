"use client";

import { useSignalMap } from "./signal-map-context";

type Point = { x: number; y: number; cluster: number };

const labels = ["Architecture", "Performance", "Real-time", "AI Systems"];
const keys = ["architecture", "performance", "realtime", "ai"] as const;
const centers = [
  [0.2, 0.26],
  [0.72, 0.22],
  [0.3, 0.72],
  [0.76, 0.7],
] as const;

function coordinate(value: number) {
  return Math.round(value * 1000) / 1000;
}

function buildPoints(spokes: number): Point[] {
  return centers.flatMap(([cx, cy], cluster) =>
    Array.from({ length: spokes + 1 }, (_, index) => ({
      x: coordinate(
        (cx + (index ? Math.cos(index * 2.1 + cluster) * 0.085 : 0)) * 1000,
      ),
      y: coordinate(
        (cy + (index ? Math.sin(index * 2.1 + cluster) * 0.11 : 0)) * 1000,
      ),
      cluster,
    })),
  );
}

function MapFrame({
  spokes,
  className,
  active,
}: {
  spokes: number;
  className: string;
  active: readonly string[];
}) {
  const points = buildPoints(spokes);
  const clusterSize = spokes + 1;
  const clusterCenters = points.filter((_, index) => index % clusterSize === 0);

  return (
    <g className={className}>
      <g className="map-lines">
        {points.flatMap((point, index) =>
          points.slice(index + 1).flatMap((otherPoint, offset) => {
            const otherIndex = index + offset + 1;
            if (
              point.cluster !== otherPoint.cluster &&
              !(index % clusterSize === 0 && otherIndex % clusterSize === 0)
            )
              return [];
            return (
              <line
                key={`${index}-${otherIndex}`}
                x1={point.x}
                y1={point.y}
                x2={otherPoint.x}
                y2={otherPoint.y}
              />
            );
          }),
        )}
      </g>
      {points.map((point, index) => {
        const isCenter = index % clusterSize === 0;
        return (
          <g key={`${point.cluster}-${point.x}-${point.y}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r={isCenter ? 3.5 : 1.8}
              className={isCenter ? "map-center" : "map-node"}
            />
            {isCenter ? (
              <text
                x={point.x + 11}
                y={point.y - 12}
                className={
                  active.includes(keys[point.cluster])
                    ? "map-label-active"
                    : undefined
                }
              >
                {labels[point.cluster]}
              </text>
            ) : null}
          </g>
        );
      })}
      {clusterCenters.map((point, index) => {
        const next = clusterCenters[(index + 1) % clusterCenters.length];
        const progress = index * 0.23;
        return (
          <circle
            key={`signal-${point.cluster}`}
            cx={coordinate(point.x + (next.x - point.x) * progress)}
            cy={coordinate(point.y + (next.y - point.y) * progress)}
            r="2.8"
            className="map-signal"
          />
        );
      })}
    </g>
  );
}

export function StaticSignalMap() {
  const { active } = useSignalMap();

  return (
    <svg
      className="static-signal-map"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      role="img"
      aria-labelledby="signal-title signal-description"
    >
      <title id="signal-title">Engineering Signal Map</title>
      <desc id="signal-description">
        Architecture, performance, real-time and AI systems connected as an
        engineering system diagram.
      </desc>
      <MapFrame spokes={4} className="map-frame-desktop" active={active} />
      <MapFrame spokes={2} className="map-frame-mobile" active={active} />
    </svg>
  );
}
