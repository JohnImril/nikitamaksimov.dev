export function ArchitectureDiagram({
  items,
}: {
  items: ReadonlyArray<{ title: string; detail: string }>;
}) {
  return (
    <div
      className="architecture-diagram"
      role="img"
      aria-label={`Architecture flow: ${items.map((item) => item.title).join(" to ")}`}
    >
      {items.map((item, index) => (
        <div className="architecture-node" key={item.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item.title}</strong>
          <p>{item.detail}</p>
          {index < items.length - 1 ? <i aria-hidden="true">→</i> : null}
        </div>
      ))}
    </div>
  );
}
