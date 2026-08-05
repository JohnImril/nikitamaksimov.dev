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
      <SectionHeading eyebrow="About" title="Complexity made understandable." />
      <div className="prose">
        <p>
          I enjoy working on frontend systems where interface complexity,
          performance, architecture and product logic meet. My strongest work
          usually involves modernizing existing applications, creating clear
          boundaries around complex state, improving delivery workflows, and
          making systems easier to understand and maintain.
        </p>
        <p>
          Alongside commercial development, I build AI-assisted engineering
          tools and explore browser technologies such as WebAssembly, WebGL and
          real-time communication.
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
