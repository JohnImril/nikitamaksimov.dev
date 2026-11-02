import {
  connections,
  facets,
  nodes,
  signalPosition,
} from "./signal-map-geometry";

export function StaticSignalMap() {
  return (
    <svg
      className="static-signal-map"
      viewBox="0 0 720 720"
      role="img"
      aria-labelledby="signal-title signal-description"
    >
      <title id="signal-title">Connected frontend concerns</title>
      <desc id="signal-description">
        An interconnected, three-dimensional system of module boundaries,
        performance, live interface state and API contracts. A conceptual
        illustration, with moving signals when motion is enabled.
      </desc>
      <defs>
        <radialGradient id="signal-glow">
          <stop stopColor="#dfd6ff" stopOpacity="0.65" />
          <stop offset="1" stopColor="#b6a5ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="signal-facet" x2="1" y2="1">
          <stop stopColor="#d1c4ff" stopOpacity="0.19" />
          <stop offset="1" stopColor="#8c9eff" stopOpacity="0.015" />
        </linearGradient>
      </defs>
      <g className="map-orbits" fill="none">
        <ellipse
          cx="360"
          cy="360"
          rx="281"
          ry="231"
          transform="rotate(-28 360 360)"
        />
        <ellipse
          cx="360"
          cy="360"
          rx="289"
          ry="107"
          transform="rotate(-38 360 360)"
        />
        <ellipse
          cx="360"
          cy="360"
          rx="279"
          ry="100"
          transform="rotate(53 360 360)"
        />
      </g>
      <g className="map-facets">
        {facets.map((facet) => (
          <polygon
            key={facet.join("-")}
            points={facet
              .map((id) => `${nodes[id].x},${nodes[id].y}`)
              .join(" ")}
          />
        ))}
      </g>
      <g className="map-lines" fill="none">
        {connections.map(([a, b]) => (
          <path
            key={`${a}-${b}`}
            d={`M${nodes[a].x},${nodes[a].y} Q${(nodes[a].x + nodes[b].x) / 2},${(nodes[a].y + nodes[b].y) / 2} ${nodes[b].x},${nodes[b].y}`}
          />
        ))}
      </g>
      <g className="map-nodes">
        {nodes.map((node) => (
          <g
            key={`${node.cluster}-${node.x}-${node.y}`}
            className={node.hub ? "map-hub" : "map-node"}
            transform={`translate(${node.x} ${node.y})`}
          >
            {node.hub ? <circle r="18" className="map-node-halo" /> : null}
            <circle r={node.hub ? 4.5 : 2.5} />
          </g>
        ))}
      </g>
      <g className="map-signals">
        {Array.from({ length: 8 }, (_, index) => {
          const point = signalPosition(index, 0);
          return (
            <g key={index} transform={`translate(${point.x} ${point.y})`}>
              <circle r="15" fill="url(#signal-glow)" />
              <circle r="3.2" fill="#e5ddff" />
            </g>
          );
        })}
      </g>
      <g className="map-labels">
        <text x="72" y="112">
          Architecture
        </text>
        <text x="500" y="144">
          Performance
        </text>
        <text x="36" y="604">
          Live UI state
        </text>
        <text x="478" y="660">
          API contracts
        </text>
        <text x="360" y="369" textAnchor="middle" className="map-core-label">
          Frontend
        </text>
      </g>
    </svg>
  );
}
