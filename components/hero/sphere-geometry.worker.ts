import { IcosahedronGeometry } from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

export type SphereGeometryBuffers = {
  position: Float32Array;
  normal: Float32Array;
  uv: Float32Array;
  tangent: Float32Array;
  index: Uint32Array;
};

self.onmessage = () => {
  // Identical to Pavel Mazhuga's desktop geometry, including merged vertices
  // and tangents for the displaced finite-difference normals.
  const source = new IcosahedronGeometry(1.3, 200);
  const geometry = mergeVertices(source);
  source.dispose();
  geometry.computeTangents();
  const floatAttribute = (name: string) => {
    const array = geometry.getAttribute(name).array;
    if (!(array instanceof Float32Array)) {
      throw new Error(`Invalid sphere attribute: ${name}`);
    }
    return array;
  };
  const index = geometry.index?.array;
  if (!(index instanceof Uint32Array)) {
    throw new Error("Invalid sphere index");
  }
  const data: SphereGeometryBuffers = {
    position: floatAttribute("position"),
    normal: floatAttribute("normal"),
    uv: floatAttribute("uv"),
    tangent: floatAttribute("tangent"),
    index,
  };
  self.postMessage(data, {
    transfer: Object.values(data).map((array) => array.buffer),
  });
  geometry.dispose();
  self.close();
};
