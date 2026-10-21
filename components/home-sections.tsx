import { profile } from "@/content/profile";
import { ExternalLink } from "./shared/external-link";
import { SectionHeading } from "./shared/section-heading";

export function AboutSection() {
  return (
    <section
      className="section split-section"
      id="about"
      aria-labelledby="about-title"
    >
      <SectionHeading
        id="about-title"
        eyebrow="About"
        title="Complexity made understandable."
      />
      <div className="prose">
        <p>
          I design clear boundaries around complex business logic, modernize
          shared libraries and migrate applications to TypeScript incrementally.
          My commercial work spans high-traffic public platforms, event-driven
          monitoring, conditional workflows, real-time interfaces and analytics
          dashboards. Regression tests, performance checks, CI/CD, release
          planning and rollback strategies help keep changes safe and
          maintainable.
        </p>
        <p>
          Beyond frontend architecture, I have commercial Node.js experience
          with REST APIs, business logic, database integrations, authentication,
          authorization and external services, collaborating across frontend and
          backend boundaries. I have also integrated AI capabilities into
          frontend products.
        </p>
        <p>
          Through personal projects, I explore full-stack architecture, other
          backend languages and frameworks, AI-powered applications and
          agent-assisted development. I keep responsibility for architecture,
          validation and testing when working with AI tools.
        </p>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section
      className="section contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <p className="eyebrow">Contact</p>
      <h2 id="contact-title">
        Have a complex frontend problem or an international role that could be a
        good fit?
      </h2>
      <a className="contact-email" href={`mailto:${profile.email}`}>
        {profile.email}
      </a>
      <div className="availability-details" aria-label="Availability details">
        <span>{profile.location}</span>
        <span>{profile.timezone}</span>
        <span>{profile.availability}</span>
      </div>
      <div className="contact-links">
        <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
        <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
        <ExternalLink href={profile.links.telegram}>Telegram</ExternalLink>
      </div>
    </section>
  );
}
