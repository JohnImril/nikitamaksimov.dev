import { Analytics } from "@vercel/analytics/next";

export function SiteAnalytics() {
  if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1")
    return null;
  return <Analytics />;
}
