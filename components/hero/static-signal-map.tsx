const clusters = [
  { label: "Architecture", x: 88, y: 84 },
  { label: "Performance", x: 380, y: 70 },
  { label: "Real-time", x: 160, y: 245 },
  { label: "AI Systems", x: 430, y: 250 },
] as const;

export function StaticSignalMap() {
  return (
    <svg
      className="static-signal-map"
      viewBox="0 0 560 340"
      role="img"
      aria-labelledby="signal-title signal-description"
    >
      <title id="signal-title">Engineering Signal Map</title>
      <desc id="signal-description">
        Architecture, performance, real-time and AI systems connected as an
        engineering system diagram.
      </desc>
      <defs>
        <linearGradient id="signal-gradient">
          <stop stopColor="#8ba8ff" />
          <stop offset="1" stopColor="#9b8cff" />
        </linearGradient>
      </defs>
      <g className="map-lines">
        <path d="M88 84 C200 34 276 130 380 70" />
        <path d="M88 84 C65 170 115 200 160 245" />
        <path d="M160 245 C270 300 338 210 430 250" />
        <path d="M380 70 C470 120 410 180 430 250" />
        <path d="M88 84 C240 120 300 220 430 250" />
      </g>
      {clusters.map((cluster) => (
        <g
          key={cluster.label}
          transform={`translate(${cluster.x} ${cluster.y})`}
        >
          <circle r="19" className="map-orbit" />
          <circle r="4.5" fill="url(#signal-gradient)" />
          <circle cx="24" cy="-16" r="2" className="map-node" />
          <circle cx="-18" cy="21" r="2" className="map-node" />
          <text y="40">{cluster.label}</text>
        </g>
      ))}
    </svg>
  );
}
