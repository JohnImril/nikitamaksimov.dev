import { profile } from "@/content/profile";
import { DynamicSignalMap } from "./dynamic-signal-map";
import { StaticSignalMap } from "./static-signal-map";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow hero-role">{profile.role}</p>
        <h1 id="hero-title">
          Build complex products. <span>Evolve working systems.</span>
        </h1>
        <p className="hero-copy">{profile.heroDescription}</p>
        <div className="hero-actions">
          <a className="button" href="#work">
            Explore selected work <span aria-hidden="true">↗</span>
          </a>
          <a
            className="button button-secondary"
            href={`mailto:${profile.email}`}
          >
            Get in touch
          </a>
        </div>
        <p className="hero-availability">
          <span className="status-dot" aria-hidden="true" />
          Open to remote roles & relocation
        </p>
      </div>
      <div className="hero-map">
        <DynamicSignalMap>
          <StaticSignalMap />
        </DynamicSignalMap>
      </div>
    </section>
  );
}
