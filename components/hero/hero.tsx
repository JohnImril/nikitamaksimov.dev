import { profile } from "@/content/profile";
import { ExternalLink } from "@/components/shared/external-link";
import { DynamicSignalMap } from "./dynamic-signal-map";
import { StaticSignalMap } from "./static-signal-map";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-map" aria-label="Engineering Signal Map">
        <StaticSignalMap />
        <DynamicSignalMap />
      </div>
      <div className="hero-content">
        <p className="eyebrow">
          <span className="status-dot" /> {profile.availability}
        </p>
        <h1 id="hero-title">
          Frontend Engineer building <span>complex, fast and maintainable</span>{" "}
          web products.
        </h1>
        <p className="hero-copy">{profile.summary}</p>
        <div className="hero-actions">
          <a className="button" href="#work">
            View selected work
          </a>
          <ExternalLink
            className="button button-secondary"
            href={profile.links.linkedin}
          >
            View LinkedIn
          </ExternalLink>
        </div>
        <div className="hero-links">
          <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
          <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
        </div>
      </div>
      <p className="technology-line">{profile.technologies.join(" · ")}</p>
    </section>
  );
}
