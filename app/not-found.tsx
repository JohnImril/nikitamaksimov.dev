import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <p className="eyebrow">404 / Route not found</p>
      <h1>This page is outside the map.</h1>
      <p>The requested route does not exist or may have moved.</p>
      <Link className="button" href="/">
        Return home
      </Link>
    </main>
  );
}
