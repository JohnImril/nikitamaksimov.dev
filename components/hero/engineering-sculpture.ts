import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  CanvasTexture,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PCFShadowMap,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  Raycaster,
  Scene,
  ShaderMaterial,
  Shape,
  Sprite,
  SpriteMaterial,
  TubeGeometry,
  CatmullRomCurve3,
  Vector2,
  Vector3,
  WebGLRenderer,
  type Material,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import {
  sculptureFrame,
  sculptureModules,
  type Vector,
} from "./sculpture-model";

export type SculptureController = {
  start: () => void;
  stop: () => void;
  reset: () => void;
  dispose: () => void;
};

function beveledBlock(
  [width, height, depth]: Vector,
  bevel = 0.065,
  cornerRatio = 0.1,
) {
  const x = width / 2 - bevel;
  const y = height / 2 - bevel;
  const corner = Math.min(width, height) * cornerRatio;
  const shape = new Shape();
  shape.moveTo(-x + corner, -y);
  shape.lineTo(x - corner, -y);
  shape.lineTo(x, -y + corner);
  shape.lineTo(x, y - corner);
  shape.lineTo(x - corner, y);
  shape.lineTo(-x + corner, y);
  shape.lineTo(-x, y - corner);
  shape.lineTo(-x, -y + corner);
  shape.closePath();
  const geometry = new ExtrudeGeometry(shape, {
    depth: depth - bevel * 2,
    bevelEnabled: true,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelSegments: 1,
    steps: 1,
    curveSegments: 1,
  });
  geometry.center();
  return geometry;
}

function glowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext("2d")!;
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(224,212,255,0.6)");
  gradient.addColorStop(0.22, "rgba(166,142,255,0.22)");
  gradient.addColorStop(1, "rgba(166,142,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  return new CanvasTexture(canvas);
}

const flowVertex = `varying vec2 vFlowUv;
void main() { vFlowUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const flowFragment = `uniform float uTime; uniform float uOffset; uniform float uBoost; uniform float uOpacity;
varying vec2 vFlowUv;
void main() {
  float pulse = pow(0.5 + 0.5 * cos((vFlowUv.x - uTime * 0.24 + uOffset) * 6.2831853), 10.0);
  vec3 color = mix(vec3(0.32, 0.32, 0.62), vec3(0.82, 0.74, 1.0), pulse);
  gl_FragColor = vec4(color * (0.35 + pulse * 2.0 + uBoost), uOpacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export async function enhanceSculpture(
  host: HTMLDivElement,
): Promise<SculptureController> {
  const renderer = new WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  const canvas = renderer.domElement;
  canvas.className = "sculpture-canvas";
  canvas.setAttribute("aria-hidden", "true");
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  // Let the page paint and process input between renderer setup and warm-up.
  await new Promise<void>((resolve) => setTimeout(resolve, 0));

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 60);
  camera.position.set(8, 5.7, 10);
  camera.lookAt(0.1, 0.5, 0);
  const root = new Group();
  scene.add(root);
  const room = new RoomEnvironment();
  const generator = new PMREMGenerator(renderer);
  const environment = generator.fromScene(room, 0, 0.1, 100, { size: 128 });
  scene.environment = environment.texture;
  scene.environmentIntensity = 1.1;
  room.dispose();
  generator.dispose();
  await new Promise<void>((resolve) => setTimeout(resolve, 0));

  scene.add(new HemisphereLight(0xd7e4ff, 0x151322, 0.5));
  const key = new DirectionalLight(0xe5edff, 3);
  key.position.set(-3, 7, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -6;
  key.shadow.camera.right = 6;
  key.shadow.camera.top = 6;
  key.shadow.camera.bottom = -6;
  key.shadow.normalBias = 0.035;
  key.shadow.bias = -0.0002;
  scene.add(key);
  const rim = new DirectionalLight(0xb6a4ff, 2);
  rim.position.set(4, 3, -5);
  scene.add(rim);
  const fill = new DirectionalLight(0xa9c1eb, 0.8);
  fill.position.set(5, 1, 4);
  scene.add(fill);
  const innerLight = new PointLight(0xb09aff, 4, 5, 2);
  innerLight.position.set(0.2, 0.2, 0.4);
  root.add(innerLight);

  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 64;
  shadowCanvas.height = 64;
  const shadowContext = shadowCanvas.getContext("2d")!;
  const shadowGradient = shadowContext.createRadialGradient(
    32,
    32,
    0,
    32,
    32,
    32,
  );
  shadowGradient.addColorStop(0, "rgba(0,0,0,0.5)");
  shadowGradient.addColorStop(1, "rgba(0,0,0,0)");
  shadowContext.fillStyle = shadowGradient;
  shadowContext.fillRect(0, 0, 64, 64);
  const shadowTexture = new CanvasTexture(shadowCanvas);
  const floor = new Mesh(
    new PlaneGeometry(6, 5),
    new MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2.09;
  scene.add(floor);
  const glow = glowTexture();
  const clockUniform = { value: 0 };
  const pickable: Mesh[] = [];
  const pieces = sculptureModules.map((module, index) => {
    const group = new Group();
    root.add(group);
    const cassette = module.id.startsWith("cassette");
    const material = new MeshPhysicalMaterial({
      color: cassette ? 0x272531 : index === 9 ? 0x343a46 : 0x242a35,
      metalness: 0.68,
      roughness: 0.24,
      clearcoat: 0.45,
      clearcoatRoughness: 0.3,
      envMapIntensity: 1.1,
      emissive: cassette ? 0x302044 : 0x000000,
      emissiveIntensity: 0.06,
      transparent: cassette,
    });
    const body = new Mesh(
      beveledBlock(
        module.size,
        index === 10 ? 0.095 : 0.065,
        index === 10 ? 0.23 : 0.1,
      ),
      material,
    );
    body.castShadow = true;
    body.receiveShadow = true;
    body.userData.moduleIndex = index;
    group.add(body);
    pickable.push(body);
    const [w, h, d] = module.size;
    // Light follows the joints and folds around a solid corner, rather than
    // drawing a repeated symbol on each face.
    const direction = index === 10 ? -1 : 1;
    const route = new CatmullRomCurve3(
      [
        new Vector3(-w * 0.43 * direction, -h * 0.35, d / 2 + 0.012),
        new Vector3(w * 0.35 * direction, -h * 0.35, d / 2 + 0.012),
        new Vector3(w * 0.45 * direction, -h * 0.28, d * 0.46),
        new Vector3((w / 2 + 0.012) * direction, -h * 0.24, d * 0.32),
        new Vector3((w / 2 + 0.012) * direction, -h * 0.24, -d * 0.3),
      ],
      false,
      "catmullrom",
      0.05,
    );
    const channelGeometry = new TubeGeometry(route, 32, 0.014, 5, false);
    const flow = new ShaderMaterial({
      uniforms: {
        uTime: clockUniform,
        uOffset: { value: index * 0.17 },
        uBoost: { value: 0 },
        uOpacity: { value: 1 },
      },
      vertexShader: flowVertex,
      fragmentShader: flowFragment,
      transparent: true,
      depthWrite: false,
    });
    const channel = new Mesh(channelGeometry, flow);
    group.add(channel);
    const aura = new Mesh(
      new TubeGeometry(route, 32, 0.043, 5, false),
      new MeshBasicMaterial({
        color: 0xa896ff,
        transparent: true,
        opacity: 0.08,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    );
    group.add(aura);
    const sprite = new Sprite(
      new SpriteMaterial({
        map: glow,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        opacity: cassette ? 0.8 : 0.5,
      }),
    );
    sprite.position.copy(route.getPoint(0.46));
    sprite.scale.setScalar(0.55);
    group.add(sprite);
    return { group, material, flow, aura, sprite, hover: 0 };
  });

  // This always-live backbone is revealed by the opening layers. It bypasses
  // the exchange slot, so illumination never stops when a cassette is absent.
  const backbone = [-0.28, 0.2].map((x, index) => {
    const curve = new CatmullRomCurve3([
      new Vector3(x, -1.4, -0.25),
      new Vector3(x, -0.2, -0.25),
      new Vector3(x, 1.75, -0.25),
    ]);
    const material = new ShaderMaterial({
      uniforms: {
        uTime: clockUniform,
        uOffset: { value: index * 0.4 },
        uBoost: { value: 0.4 },
        uOpacity: { value: 1 },
      },
      vertexShader: flowVertex,
      fragmentShader: flowFragment,
    });
    const rail = new Mesh(
      new TubeGeometry(curve, 32, 0.023, 6, false),
      material,
    );
    root.add(rail);
    return rail;
  });

  const pointer = new Vector2();
  const target = new Vector2();
  const raycaster = new Raycaster();
  let pointerInside = false;
  let elapsed = 0;
  let lastTime = 0;
  let frame = 0;
  let running = false;
  let lost = false;
  let prepared = false;
  let currentPhase = "";

  function draw(delta = 0) {
    const pose = sculptureFrame(elapsed);
    const easing = delta ? 1 - Math.exp(-delta / 160) : 1;
    pointer.lerp(target, easing);
    root.rotation.set(
      pointer.y * 0.055,
      pose.turn + pointer.x * 0.085,
      -pointer.x * 0.018,
    );
    let hovered = -1;
    if (pointerInside) {
      scene.updateMatrixWorld();
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster
        .intersectObjects(pickable, false)
        .find((intersection) => intersection.object.parent?.visible);
      hovered = hit?.object.userData.moduleIndex ?? -1;
    }
    pieces.forEach((piece, index) => {
      const state = pose.modules[index];
      piece.hover += ((index === hovered ? 1 : 0) - piece.hover) * easing;
      piece.group.visible = state.opacity > 0.005;
      piece.group.position.set(...state.position);
      piece.group.position.x += piece.hover * 0.08;
      piece.group.position.y += piece.hover * 0.05;
      piece.group.position.z += piece.hover * 0.18;
      piece.group.rotation.set(...state.rotation);
      piece.material.opacity = state.opacity;
      piece.material.emissiveIntensity =
        pose.phase === "exchange" &&
        (index === pose.incomingIndex || index === pose.outgoingIndex)
          ? 0.32
          : 0.06;
      piece.material.depthWrite = state.opacity > 0.98;
      piece.flow.uniforms.uOpacity.value = state.opacity;
      piece.flow.uniforms.uBoost.value =
        piece.hover * 0.8 +
        (pose.phase === "exchange" &&
        (index === pose.outgoingIndex || index === pose.incomingIndex)
          ? 0.5
          : 0);
      piece.aura.material.opacity = state.opacity * (0.08 + piece.hover * 0.08);
      piece.sprite.material.opacity = state.opacity * 0.5;
    });
    backbone.forEach((rail) => {
      rail.scale.y = 1 + pose.openness * 0.48;
      rail.position.y = pose.openness * 0.33;
    });
    clockUniform.value = elapsed;
    innerLight.intensity = 4 + pose.openness * 3;
    if (currentPhase !== pose.phase) {
      currentPhase = pose.phase;
      host.dataset.phase = pose.phase;
    }
    host.dataset.hovered = hovered < 0 ? "" : sculptureModules[hovered].id;
    renderer.render(scene, camera);
  }

  function resize() {
    const rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.5, 1100 / rect.width),
    );
    renderer.setSize(rect.width, rect.height, false);
    const aspect = rect.width / rect.height;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    if (!lost && prepared) draw();
  }
  const tick = (now: number) => {
    if (!running || lost) return;
    const delta = lastTime ? Math.min(now - lastTime, 50) : 0;
    lastTime = now;
    elapsed += delta / 1000;
    draw(delta);
    frame = requestAnimationFrame(tick);
  };
  const start = () => {
    if (running || lost) return;
    running = true;
    lastTime = 0;
    host.dataset.motion = "running";
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
    lastTime = 0;
    pointerInside = false;
    target.set(0, 0);
    host.dataset.motion = "paused";
  };
  const reset = () => {
    elapsed = 0;
    pointer.set(0, 0);
    target.set(0, 0);
    pieces.forEach((piece) => {
      piece.hover = 0;
    });
    if (!lost) draw();
    host.dataset.motion = "static";
  };
  const move = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const rect = canvas.getBoundingClientRect();
    target.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    pointerInside = true;
  };
  const leave = () => {
    target.set(0, 0);
    pointerInside = false;
  };
  const contextLost = (event: Event) => {
    event.preventDefault();
    stop();
    lost = true;
    host.dataset.renderer = "fallback";
  };
  const contextRestored = () => {
    lost = false;
    resize();
    host.dataset.renderer = "webgl";
    host.dispatchEvent(new Event("sculpture:restored"));
  };
  canvas.addEventListener("pointermove", move, { passive: true });
  canvas.addEventListener("pointerleave", leave);
  canvas.addEventListener("webglcontextlost", contextLost);
  canvas.addEventListener("webglcontextrestored", contextRestored);
  const observer = new ResizeObserver(resize);
  resize();
  // Warm shaders before swapping out the still; keep input responsive while
  // the driver compiles. Older contexts get a task boundary instead.
  if (renderer.extensions.has("KHR_parallel_shader_compile")) {
    await renderer.compileAsync(scene, camera);
  } else {
    renderer.compile(scene, camera);
    await new Promise<void>((resolve) => setTimeout(resolve, 32));
  }
  resize();
  prepared = true;
  draw();
  // Drain the first GPU frame without a synchronous readback or gl.finish().
  // The matching still stays visible until shadows and shaders are ready.
  const gl = renderer.getContext();
  if (gl instanceof WebGL2RenderingContext) {
    const fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    if (fence) {
      gl.flush();
      await new Promise<void>((resolve) => {
        const check = () => {
          const status = gl.clientWaitSync(fence, 0, 0);
          if (status === gl.TIMEOUT_EXPIRED) setTimeout(check, 8);
          else {
            gl.deleteSync(fence);
            resolve();
          }
        };
        check();
      });
    }
  }
  observer.observe(host);
  host.appendChild(canvas);
  host.dataset.renderer = "webgl";

  return {
    start,
    stop,
    reset,
    dispose() {
      stop();
      observer.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("webglcontextlost", contextLost);
      canvas.removeEventListener("webglcontextrestored", contextRestored);
      const materials = new Set<Material>();
      scene.traverse((object) => {
        if (object instanceof Mesh || object instanceof Sprite) {
          if (object instanceof Mesh) object.geometry.dispose();
          const list = Array.isArray(object.material)
            ? object.material
            : [object.material];
          list.forEach((material) => materials.add(material));
        }
      });
      materials.forEach((material) => material.dispose());
      glow.dispose();
      shadowTexture.dispose();
      environment.dispose();
      key.shadow.map?.dispose();
      renderer.dispose();
      canvas.remove();
      delete host.dataset.renderer;
    },
  };
}
