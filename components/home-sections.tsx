import { profile } from "@/content/profile";
import Link from "next/link";
import { ExternalLink } from "./shared/external-link";
import { SectionHeading } from "./shared/section-heading";

export function AboutSection() {
  return (
    <section
      className="section approach-section"
      id="about"
      aria-labelledby="about-title"
    >
      <SectionHeading
        id="about-title"
        eyebrow="Engineering approach"
        title="Decisions you can trace in the work."
      />
      <div className="principles-grid">
        <article>
          <h3>Keep responsibilities clear.</h3>
          <p>
            In Diablo Web, the React UI calls runtime APIs; engine, storage and
            network effects stay behind that boundary.
          </p>
          <Link className="text-link" href="/work/diablo-web#decisions-title">
            See the module boundaries →
          </Link>
        </article>
        <article>
          <h3>Evolve before rewriting.</h3>
          <p>
            For shared commercial libraries, I chose staged adoption with
            regression checks and rollback planning.
          </p>
          <a className="text-link" href="#commercial-modernization">
            See the migration example →
          </a>
        </article>
        <article>
          <h3>Follow the data through the system.</h3>
          <p>
            In my personal ReviewPilot project, manual and GitHub-triggered
            reviews share the same application service and validation contract.
          </p>
          <Link
            className="text-link"
            href="/work/reviewpilot-ai#architecture-title"
          >
            Trace the review workflow →
          </Link>
        </article>
        <article>
          <h3>Measure and test the result.</h3>
          <p>
            Forest records bundle and loading improvements alongside a slower
            full build. Tests and measurements answer different questions.
          </p>
          <Link className="text-link" href="/work/forest#results-title">
            Read the measured comparison →
          </Link>
        </article>
      </div>
      <section
        className="beyond-frontend"
        id="beyond-frontend"
        aria-labelledby="beyond-title"
      >
        <h3 id="beyond-title">Frontend depth, wider system context.</h3>
        <div className="beyond-grid">
          <div>
            <p className="eyebrow">Additional commercial experience</p>
            <p>
              Node.js APIs, business logic, database integrations,
              authentication, authorization and external services help me work
              through the whole user workflow. My commercial AI work is
              integrating AI capabilities into frontend products.
            </p>
          </div>
          <div>
            <p className="eyebrow">Personal and learning projects</p>
            <p>
              I explore full-stack and backend architecture, AI applications,
              agents and developer tools.{" "}
              <Link href="/work/reviewpilot-ai">ReviewPilot AI</Link> makes the
              API, provider contract and evaluation work inspectable. With
              AI-assisted development, I remain responsible for architecture,
              checking solutions and testing.
            </p>
          </div>
        </div>
      </section>
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
        Building a product, modernizing a frontend, or hiring a senior engineer?
      </h2>
      <p className="contact-copy">
        I’m open to international Senior Frontend Engineer roles, remote work
        and relocation.
      </p>
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
