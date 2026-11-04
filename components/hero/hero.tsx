import { profile } from "@/content/profile";
import { DynamicSphere } from "./dynamic-sphere";
import { StaticSphere } from "./static-sphere";

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
          Open to remote roles
        </p>
      </div>
      <div className="hero-visual">
        <DynamicSphere>
          <StaticSphere />
        </DynamicSphere>
      </div>
    </section>
  );
}
