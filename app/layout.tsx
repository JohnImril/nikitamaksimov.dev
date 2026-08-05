import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteAnalytics } from "@/lib/analytics";
import { siteUrl } from "@/lib/metadata";
import { profile } from "@/content/profile";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});
const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nikita Maksimov — Frontend Engineer",
    template: "%s | Nikita Maksimov",
  },
  description:
    "Frontend Engineer with 4.5+ years of experience in React, Next.js, TypeScript, architecture, performance, real-time systems and AI developer tools.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: profile.name,
    title: "Nikita Maksimov — Frontend Engineer",
    description: profile.summary,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nikita Maksimov, Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikita Maksimov — Frontend Engineer",
    description: profile.summary,
    images: ["/opengraph-image"],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0d10",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
      url: siteUrl,
      sameAs: [profile.links.github, profile.links.linkedin],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Astana",
        addressCountry: "KZ",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${profile.name} — Portfolio`,
      url: siteUrl,
      author: { "@type": "Person", name: profile.name },
    },
  ];
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <SiteAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
