/**
 * Animated Displaced Sphere — Pavel Mazhuga / Codrops.
 * Adapted from 83bb3d2639460e4a5c478e23414356957968a8d8.
 * Original MIT notice: public/hero/displaced-sphere.LICENSE.txt.
 */
import {
  ACESFilmicToneMapping,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from "three";
import type { SphereGeometryBuffers } from "./sphere-geometry.worker";
import { fragmentShader, vertexShader } from "./sphere-shaders";

export type SphereController = {
  start(): void;
  stop(): void;
  reset(): void;
  dispose(): void;
};

async function createGeometry() {
  // Keep the author's full 200 subdivisions and tangent calculation off the
  // main thread so the hero and its links remain responsive during setup.
  const worker = new Worker(
    new URL("./sphere-geometry.worker.ts", import.meta.url),
  );
  try {
    const data = await new Promise<SphereGeometryBuffers>((resolve, reject) => {
      worker.onmessage = (event: MessageEvent<SphereGeometryBuffers>) =>
        resolve(event.data);
      worker.onerror = () => reject(new Error("Sphere geometry unavailable"));
      worker.postMessage(null);
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(data.position, 3));
    geometry.setAttribute("normal", new BufferAttribute(data.normal, 3));
    geometry.setAttribute("uv", new BufferAttribute(data.uv, 2));
    geometry.setAttribute("tangent", new BufferAttribute(data.tangent, 4));
    geometry.setIndex(new BufferAttribute(data.index, 1));
    return geometry;
  } finally {
    worker.terminate();
  }
}

export async function enhanceSphere(
  host: HTMLDivElement,
): Promise<SphereController> {
  const canvas = document.createElement("canvas");
  canvas.className = "sphere-canvas";
  canvas.setAttribute("aria-hidden", "true");
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  // Match the r165 React Three Fiber defaults used by the recorded original.
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.set(0, 0, 6);
  // Scale only the framing; retain the author's perspective and orientation.
  camera.zoom = 1.25;
  const uniforms = {
    uTime: { value: 0 },
    uColor: { value: new Color("#af00ff") },
    uSpeed: { value: 1.1 },
    uNoiseStrength: { value: 0.3 },
    uDisplacementStrength: { value: 0.57 },
    uFractAmount: { value: 4 },
  };
  const material = new MeshPhysicalMaterial({
    roughness: 0.56,
    metalness: 0.76,
    reflectivity: 0.46,
    clearcoat: 0,
    ior: 2.81,
    iridescence: 0.96,
  });
  // The author's GLSL is unchanged. These two function signatures and chunk
  // bindings replace CustomShaderMaterial's csm_* bridge without its React UI.
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>\n${vertexShader.replace(
          "void main() {",
          "void displaceSphere(inout vec3 csm_Position, inout vec3 csm_Normal) {",
        )}`,
      )
      .replace(
        "#include <beginnormal_vertex>",
        `vec3 spherePosition = position;
         vec3 sphereNormal = normal;
         displaceSphere(spherePosition, sphereNormal);
         #include <beginnormal_vertex>
         objectNormal = sphereNormal;`,
      )
      .replace("#include <begin_vertex>", "vec3 transformed = spherePosition;");
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>\n${fragmentShader.replace(
          "void main() {",
          "void colorSphere(inout vec4 csm_DiffuseColor) {",
        )}`,
      )
      .replace(
        "#include <color_fragment>",
        "#include <color_fragment>\ncolorSphere(diffuseColor);",
      );
  };
  const light = new DirectionalLight("#ffffff", 5);
  light.position.set(-2, 2, 3.5);
  scene.add(new AmbientLight("#ffffff", 1), light);

  let geometry: BufferGeometry | undefined;
  let elapsed = 0;
  let lastTime = 0;
  let frame = 0;
  let running = false;
  let lost = false;
  let disposed = false;
  let prepared = false;

  const draw = () => {
    uniforms.uTime.value = elapsed;
    renderer.render(scene, camera);
  };
  const resize = () => {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.5, 1100 / rect.width),
    );
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
    if (prepared && !lost) draw();
  };
  const tick = (now: number) => {
    if (!running || lost || disposed) return;
    // Pauses do not advance the shader clock or cause a jump on resume.
    elapsed += lastTime ? (now - lastTime) / 1000 : 0;
    lastTime = now;
    draw();
    frame = requestAnimationFrame(tick);
  };
  const start = () => {
    if (running || lost || disposed) return;
    running = true;
    lastTime = 0;
    host.dataset.motion = "running";
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
    lastTime = 0;
    host.dataset.motion = "paused";
  };
  const reset = () => {
    elapsed = 0;
    if (!lost && prepared) draw();
    host.dataset.motion = "static";
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    stop();
    lost = true;
    host.dataset.renderer = "fallback";
  };
  const contextRestored = () => {
    lost = false;
    void renderer
      .compileAsync(scene, camera)
      .then(() => {
        if (disposed || lost) return;
        resize();
        host.dataset.renderer = "webgl";
        host.dispatchEvent(new Event("sphere:restored"));
      })
      .catch(() => {
        host.dataset.renderer = "fallback";
      });
  };
  const observer = new ResizeObserver(resize);
  const dispose = () => {
    disposed = true;
    stop();
    observer.disconnect();
    canvas.removeEventListener("webglcontextlost", contextLost);
    canvas.removeEventListener("webglcontextrestored", contextRestored);
    geometry?.dispose();
    material.dispose();
    renderer.dispose();
    canvas.remove();
    delete host.dataset.renderer;
  };

  try {
    geometry = await createGeometry();
    const sphere = new Mesh(geometry, material);
    sphere.frustumCulled = false;
    scene.add(sphere);
    canvas.addEventListener("webglcontextlost", contextLost);
    canvas.addEventListener("webglcontextrestored", contextRestored);
    resize();
    await renderer.compileAsync(scene, camera);
    prepared = true;
    draw();
    observer.observe(host);
    host.appendChild(canvas);
    host.dataset.renderer = "webgl";
    return { start, stop, reset, dispose };
  } catch (error) {
    dispose();
    throw error;
  }
}
