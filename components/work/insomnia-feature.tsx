import Link from "next/link";
import { insomnia } from "@/content/insomnia";
import { FeederHero } from "@/components/case-study/insomnia-images";

export function InsomniaFeature() {
  return (
    <article className="feeder-feature" data-project={insomnia.slug}>
      <FeederHero />
      <div className="feeder-feature-content">
        <p className="eyebrow">Collaborative engineering / Volunteer project</p>
        <h3>{insomnia.title}</h3>
        <p>
          I connected volunteer and inventory workflows across React and Django,
          refined mobile data loading, and modernized the frontend toolchain.
        </p>
        <p className="feeder-role">
          {insomnia.period}
          <br />
          React · TypeScript · Django · Vite
        </p>
        <Link className="button" href={`/work/${insomnia.slug}`}>
          Explore the case study <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
