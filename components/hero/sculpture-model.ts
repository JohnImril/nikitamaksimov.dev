export type Vector = readonly [number, number, number];
export type SculptureModule = {
  id: string;
  size: Vector;
  position: Vector;
  spread: Vector;
};

// Ten assembled pieces; the eleventh is the replacement cassette, visible only
// during an exchange. The same model drives both directions of the cycle.
export const sculptureModules: readonly SculptureModule[] = [
  {
    id: "foundation-left",
    size: [1.75, 0.92, 1.45],
    position: [-0.82, -1.18, 0.65],
    spread: [-0.12, -0.32, 0.15],
  },
  {
    id: "foundation-right",
    size: [1.65, 0.92, 1.45],
    position: [0.98, -1.18, 0.65],
    spread: [0.22, -0.32, 0.15],
  },
  {
    id: "foundation-back",
    size: [2.65, 0.92, 1.16],
    position: [-0.05, -1.18, -0.75],
    spread: [0, -0.32, -0.38],
  },
  {
    id: "spine",
    size: [1.15, 1.04, 2.52],
    position: [-1.08, -0.12, -0.05],
    spread: [-0.52, 0.08, 0],
  },
  {
    id: "service-back",
    size: [2.15, 1.04, 1.08],
    position: [0.63, -0.12, -0.78],
    spread: [0.12, 0.08, -0.65],
  },
  {
    id: "cassette-a",
    size: [1.9, 1.04, 1.25],
    position: [0.45, -0.12, 0.58],
    spread: [0.12, 0.08, 0.48],
  },
  {
    id: "crown-left",
    size: [1.85, 0.96, 1.28],
    position: [-0.82, 0.98, 0.47],
    spread: [-0.28, 0.85, 0.12],
  },
  {
    id: "crown-right",
    size: [1.05, 0.96, 2.3],
    position: [0.77, 0.98, -0.06],
    spread: [0.36, 0.85, -0.12],
  },
  {
    id: "crown-back",
    size: [0.75, 0.96, 1],
    position: [-1.2, 0.98, -0.82],
    spread: [-0.32, 0.85, -0.5],
  },
  {
    id: "keystone",
    size: [2, 0.46, 1.15],
    position: [-0.26, 1.77, -0.16],
    spread: [-0.18, 1.25, -0.15],
  },
  {
    id: "cassette-b",
    size: [1.9, 1.04, 1.25],
    position: [0.45, -0.12, 0.58],
    spread: [0.12, 0.08, 0.48],
  },
];

export const SCULPTURE_CYCLE_SECONDS = 14;
export const SCULPTURE_KEYFRAMES = {
  assembled: 0,
  open: 4.9,
  exchange: 7.8,
} as const;

function ease(start: number, end: number, time: number) {
  const t = Math.max(0, Math.min(1, (time - start) / (end - start)));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function sculptureFrame(seconds: number) {
  const time = seconds % SCULPTURE_CYCLE_SECONDS;
  const alternate = Math.floor(seconds / SCULPTURE_CYCLE_SECONDS) % 2 === 1;
  const openness = ease(1.6, 4.7, time) * (1 - ease(9.25, 12, time));
  const extraction = ease(5.15, 7.15, time);
  const arrival = ease(6.65, 9.05, time);
  const departure = ease(7.65, 9.15, time);
  const incomingOpacity = ease(5.9, 6.55, time);
  const outgoingIndex = alternate ? 10 : 5;
  const incomingIndex = alternate ? 5 : 10;
  const modules = sculptureModules.map((module, index) => {
    const position: [number, number, number] = [
      module.position[0] + module.spread[0] * openness,
      module.position[1] + module.spread[1] * openness,
      module.position[2] + module.spread[2] * openness,
    ];
    const rotation: [number, number, number] = [0, 0, 0];
    const layerTurn =
      index < 3
        ? -0.08
        : index >= 6 && index <= 8
          ? 0.12
          : index === 9
            ? -0.14
            : 0;
    const x = position[0];
    position[0] = x * Math.cos(layerTurn) + position[2] * Math.sin(layerTurn);
    position[2] = position[2] * Math.cos(layerTurn) - x * Math.sin(layerTurn);
    rotation[1] = layerTurn;
    if (index === 3) rotation[1] -= openness * 0.12;
    if (index === 7) rotation[1] += openness * 0.1;
    let opacity = 1;
    if (index === outgoingIndex) {
      position[0] += extraction * 1.95 + departure * 0.2;
      position[1] += extraction * 0.14 - departure * 0.35;
      position[2] += extraction * 0.9 - departure * 1.25;
      rotation[1] = extraction * 0.65;
      rotation[2] = extraction * -0.13;
      opacity = 1 - departure;
    } else if (index === incomingIndex) {
      position[0] += (1 - arrival) * 1.65;
      position[1] += (1 - arrival) * 1.5;
      position[2] -= (1 - arrival) * 0.7;
      rotation[1] = (1 - arrival) * -0.55;
      rotation[2] = (1 - arrival) * 0.12;
      opacity = incomingOpacity;
    }
    return { id: module.id, position, rotation, opacity };
  });
  const phase =
    time < 1.6
      ? "working"
      : time < 5.15
        ? "opening"
        : time < 9.25
          ? "exchange"
          : time < 12
            ? "assembly"
            : "rest";
  return {
    modules,
    openness,
    phase,
    outgoingIndex,
    incomingIndex,
    turn: Math.sin((time / SCULPTURE_CYCLE_SECONDS) * Math.PI * 2) * 0.025,
  };
}
