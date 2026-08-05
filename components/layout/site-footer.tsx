import { profile } from "@/content/profile";
import { ExternalLink } from "@/components/shared/external-link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{profile.name}</strong>
        <p>
          © {new Date().getFullYear()} · {profile.location} · {profile.timezone}
        </p>
      </div>
      <div className="footer-links">
        <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
        <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
      </div>
    </footer>
  );
}
