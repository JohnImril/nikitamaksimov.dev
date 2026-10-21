export function SectionHeading({
  eyebrow,
  title,
  copy,
  id,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  id?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {copy ? <p className="section-copy">{copy}</p> : null}
    </div>
  );
}
