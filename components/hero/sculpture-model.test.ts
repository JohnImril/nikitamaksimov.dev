import { describe, expect, it } from "vitest";
import {
  sculptureFrame,
  sculptureModules,
  SCULPTURE_CYCLE_SECONDS,
} from "./sculpture-model";

describe("kinetic sculpture choreography", () => {
  it("starts with ten assembled modules and opens within the first three seconds", () => {
    const assembled = sculptureFrame(0);
    expect(
      assembled.modules.filter((piece) => piece.opacity > 0.01),
    ).toHaveLength(10);
    expect(assembled.openness).toBe(0);
    expect(sculptureFrame(2.8).openness).toBeGreaterThan(0.2);
    expect(
      sculptureFrame(4.9).modules[9].position[1] -
        assembled.modules[9].position[1],
    ).toBeGreaterThan(1);
  });

  it("exchanges two distinct cassettes while the remaining structure stays present", () => {
    const open = sculptureFrame(4.9);
    const exchange = sculptureFrame(7.8);
    expect(exchange.phase).toBe("exchange");
    expect(
      exchange.modules.filter((piece) => piece.opacity > 0.01),
    ).toHaveLength(11);
    const old = exchange.modules[exchange.outgoingIndex];
    const replacement = exchange.modules[exchange.incomingIndex];
    expect(
      Math.hypot(
        ...old.position.map(
          (value, axis) => value - replacement.position[axis],
        ),
      ),
    ).toBeGreaterThan(1);
    for (const [index, piece] of exchange.modules.entries()) {
      if (piece.id.startsWith("cassette")) continue;
      expect(piece.position).toEqual(open.modules[index].position);
      expect(piece.opacity).toBe(1);
    }
  });

  it("reassembles around the replacement with a calm phase before the next opening", () => {
    const settled = sculptureFrame(12.5);
    expect(settled.phase).toBe("rest");
    expect(settled.openness).toBe(0);
    expect(settled.modules[5].opacity).toBe(0);
    expect(settled.modules[10].opacity).toBe(1);
    expect(settled.modules[10].position).toEqual(
      sculptureFrame(0).modules[5].position,
    );
  });

  it("continues smoothly across both exchange directions without a visible reset", () => {
    for (const boundary of [
      SCULPTURE_CYCLE_SECONDS,
      SCULPTURE_CYCLE_SECONDS * 2,
    ]) {
      const before = sculptureFrame(boundary - 0.0001);
      const after = sculptureFrame(boundary + 0.0001);
      for (let index = 0; index < sculptureModules.length; index++) {
        if (before.modules[index].opacity < 0.01) continue;
        expect(after.modules[index].opacity).toBeCloseTo(
          before.modules[index].opacity,
          4,
        );
        before.modules[index].position.forEach((value, axis) =>
          expect(after.modules[index].position[axis]).toBeCloseTo(value, 4),
        );
        before.modules[index].rotation.forEach((value, axis) =>
          expect(after.modules[index].rotation[axis]).toBeCloseTo(value, 4),
        );
      }
      expect(after.turn).toBeCloseTo(before.turn, 4);
    }
  });
});
