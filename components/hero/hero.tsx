import { profile } from "@/content/profile";
import { ExternalLink } from "@/components/shared/external-link";
import { StaticSignalMap } from "./static-signal-map";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">{profile.role}</p>
        <h1 id="hero-title">
          Build complex products. <span>Evolve working systems.</span>
        </h1>
        <p className="hero-copy">{profile.heroDescription}</p>
        <div className="hero-actions">
          <a className="button" href="#work">
            Explore selected work <span aria-hidden="true">→</span>
          </a>
          <a
            className="button button-secondary"
            href={`mailto:${profile.email}`}
          >
            Get in touch
          </a>
        </div>
        <div className="hero-links">
          <a href="#experience">Commercial experience ↓</a>
          <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
          <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
        </div>
        <p className="hero-availability">
          <span className="status-dot" aria-hidden="true" />
          {profile.availability}
        </p>
      </div>
      <div className="hero-map">
        <p className="map-caption">Frontend engineering / connected concerns</p>
        <StaticSignalMap />
      </div>
    </section>
  );
}
