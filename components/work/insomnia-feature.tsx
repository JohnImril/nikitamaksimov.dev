import Link from "next/link";
import { insomnia } from "@/content/insomnia";
import { InsomniaProductMap } from "@/components/case-study/insomnia-visuals";

export function InsomniaFeature() {
  return (
    <article className="feeder-feature" data-project={insomnia.slug}>
      <InsomniaProductMap />
      <div className="feeder-feature-content">
        <p className="eyebrow">Featured / Collaborative volunteer project</p>
        <h3>
          <Link href={`/work/${insomnia.slug}`}>{insomnia.title}</Link>
        </h3>
        <p>{insomnia.summary}</p>
        <p className="feeder-role">
          {insomnia.role}
          <br />
          {insomnia.period}
        </p>
        <p>
          I contributed to an existing React, TypeScript, and Django platform:
          modernizing the toolchain, targeting mobile loading costs, and
          connecting inventory workflows and operational rules across the stack.
        </p>
        <Link className="button" href={`/work/${insomnia.slug}`}>
          Explore the engineering case study <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
