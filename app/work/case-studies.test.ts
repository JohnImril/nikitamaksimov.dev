import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createElement } from "react";
import WorkPage, {
  generateMetadata,
  generateStaticParams,
} from "./[slug]/page";
import { sharedLibraryModernization as study } from "@/content/commercial";
import { projects } from "@/content/projects";
import { contributions } from "@/content/contributions";
import { OpenSourceContributions } from "@/components/work/open-source-contributions";
import { commercialPerformance } from "@/content/experience";
import sitemap from "@/app/sitemap";
import { absoluteUrl } from "@/lib/metadata";

afterEach(cleanup);

describe("commercial case integration", () => {
  it("generates unique routes for commercial and existing personal work", () => {
    const slugs = generateStaticParams().map(({ slug }) => slug);
    expect(slugs).toEqual([...projects, study].map(({ slug }) => slug));
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(
      sitemap().some(({ url }) => url === absoluteUrl(`/work/${study.slug}`)),
    ).toBe(true);
  });

  it("renders a commercial case without demo or repository links", async () => {
    render(await WorkPage({ params: Promise.resolve({ slug: study.slug }) }));
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      study.title,
    );
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(
      study.sections.length,
    );
    expect(
      screen
        .getAllByRole("link")
        .every((link) => link.getAttribute("href")?.startsWith("/#")),
    ).toBe(true);
    expect(
      screen
        .getByRole("link", { name: /Commercial experience/ })
        .getAttribute("href"),
    ).toBe("/#commercial-modernization");
  });

  it("generates canonical and social metadata for both content types", async () => {
    const entries = [...projects, study];
    const results = await Promise.all(
      entries.map((entry) =>
        generateMetadata({ params: Promise.resolve({ slug: entry.slug }) }),
      ),
    );
    for (const [index, metadata] of results.entries()) {
      const entry = entries[index];
      expect(metadata.alternates?.canonical).toBe(
        absoluteUrl(`/work/${entry.slug}`),
      );
      expect(metadata.openGraph?.title).toContain(entry.title);
      expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    }
    expect(
      await generateMetadata({ params: Promise.resolve({ slug: "unknown" }) }),
    ).toEqual({});
  });
});

describe("public evidence", () => {
  it("links each contribution directly to a secure pull request", () => {
    render(createElement(OpenSourceContributions));
    for (const item of contributions) {
      const url = new URL(item.url);
      expect(url.protocol).toBe("https:");
      expect(url.hostname).toBe("github.com");
      expect(url.pathname).toBe(`/Insomnia-IT/feed/pull/${item.number}`);
      const link = screen.getByRole("link", {
        name: `Read PR #${item.number}`,
      });
      expect(link.getAttribute("href")).toBe(item.url);
      expect(link.getAttribute("rel")).toContain("noreferrer");
    }
  });

  it("keeps TTI explicit and separate from build and JavaScript results", () => {
    expect(commercialPerformance).toHaveLength(3);
    expect(commercialPerformance[2]).toMatchObject({
      value: "≈5s → ≈2s",
      label: "Time to Interactive (TTI)",
    });
    expect(commercialPerformance[0].value).toBe("≈32%");
    expect(commercialPerformance[1].value).toBe("≈25%");
  });
});
