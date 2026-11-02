export function ArchitectureDiagram({
  items,
}: {
  items: ReadonlyArray<{ title: string; detail: string }>;
}) {
  return (
    <ol className="architecture-diagram" aria-label="Architecture flow">
      {items.map((item, index) => (
        <li className="architecture-node" key={item.title}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <strong>{item.title}</strong>
          <p>{item.detail}</p>
          {index < items.length - 1 ? <i aria-hidden="true">→</i> : null}
        </li>
      ))}
    </ol>
  );
}
