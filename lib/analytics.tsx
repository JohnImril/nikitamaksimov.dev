import { Analytics } from "@vercel/analytics/next";

export function SiteAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return <Analytics />;
}
