import Link from "next/link";
import { sharedLibraryModernization as study } from "@/content/commercial";

export function CommercialCaseStudy() {
  return (
    <main id="main-content" className="case-study" tabIndex={-1}>
      <header className="case-hero">
        <Link className="back-link" href="/#commercial-modernization">
          ← Commercial experience
        </Link>
        <p className="eyebrow">{study.positioning}</p>
        <h1>{study.title}</h1>
        <p className="case-intro">{study.summary}</p>
      </header>
      {study.sections.map((section) => (
        <section
          className="case-section"
          key={section.id}
          aria-labelledby={`${section.id}-title`}
        >
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          <p>{section.body}</p>
        </section>
      ))}
      <nav className="case-navigation" aria-label="Continue exploring">
        <Link href="/#commercial-performance">
          Separate commercial performance results →
        </Link>
        <Link href="/work/insomnia-feeder">
          Explore the Insomnia case study →
        </Link>
      </nav>
    </main>
  );
}
