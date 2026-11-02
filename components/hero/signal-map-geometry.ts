export type Point = { x: number; y: number };
type Node = Point & { cluster: number; hub: boolean };

const centers = [
  [206, 202],
  [534, 245],
  [164, 474],
  [506, 538],
] as const;

// Shared by the server-rendered illustration and its progressive enhancement.
export const nodes: Node[] = centers.flatMap(([x, y], cluster) => [
  { x, y, cluster, hub: true },
  ...Array.from({ length: 6 }, (_, index) => {
    const angle = (index / 6) * Math.PI * 2 + cluster * 0.35;
    return {
      x: x + Math.cos(angle) * (index % 2 ? 66 : 54),
      y: y + Math.sin(angle) * (index % 2 ? 60 : 46),
      cluster,
      hub: false,
    };
  }),
]);
nodes.push(
  ...Array.from({ length: 6 }, (_, index) => {
    const angle = (index / 6) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 360 + Math.cos(angle) * 95,
      y: 360 + Math.sin(angle) * 100,
      cluster: 4,
      hub: false,
    };
  }),
);

export const connections: [number, number][] = centers.flatMap(
  (_center, cluster) => {
    const hub = cluster * 7;
    return Array.from({ length: 6 }, (_, index): [number, number][] => [
      [hub, hub + index + 1],
      [hub + index + 1, hub + ((index + 1) % 6) + 1],
    ]).flat();
  },
);
connections.push(
  [0, 7],
  [7, 21],
  [21, 14],
  [14, 0],
  [0, 28],
  [7, 29],
  [7, 30],
  [21, 31],
  [14, 32],
  [0, 33],
  ...Array.from({ length: 6 }, (_, index): [number, number] => [
    28 + index,
    28 + ((index + 1) % 6),
  ]),
  [28, 31],
  [29, 32],
  [30, 33],
);
export const facets = centers.flatMap((_, cluster) => [
  [cluster * 7, cluster * 7 + 1, cluster * 7 + 2],
  [cluster * 7, cluster * 7 + 3, cluster * 7 + 4],
  [cluster * 7, cluster * 7 + 5, cluster * 7 + 6],
]);
facets.push([28, 29, 33], [29, 30, 32], [30, 31, 32]);

export function signalPosition(
  index: number,
  seconds: number,
  points: Point[] = nodes,
  controls?: Point[],
) {
  const edge = 48 + (index % 8);
  const [from, to] = connections[edge];
  const a = points[from];
  const b = points[to];
  const control = controls?.[edge] ?? {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
  const t = (seconds / (4.8 + (index % 3) * 0.7) + index * 0.127) % 1;
  return {
    x: (1 - t) ** 2 * a.x + 2 * (1 - t) * t * control.x + t ** 2 * b.x,
    y: (1 - t) ** 2 * a.y + 2 * (1 - t) * t * control.y + t ** 2 * b.y,
  };
}
