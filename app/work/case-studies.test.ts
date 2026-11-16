import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createElement } from "react";
import WorkPage, {
  generateMetadata,
  generateStaticParams,
} from "./[slug]/page";
import { sharedLibraryModernization as study } from "@/content/commercial";
import { projects } from "@/content/projects";
import { insomnia, insomniaReferences } from "@/content/insomnia";
import { InsomniaFeature } from "@/components/work/insomnia-feature";
import { AboutSection } from "@/components/home-sections";
import { commercialPerformance } from "@/content/experience";
import sitemap from "@/app/sitemap";
import { absoluteUrl } from "@/lib/metadata";

afterEach(cleanup);

describe("commercial case integration", () => {
  it("generates unique routes for commercial and existing personal work", () => {
    const slugs = generateStaticParams().map(({ slug }) => slug);
    expect(slugs).toEqual(
      [...projects, study, insomnia].map(({ slug }) => slug),
    );
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
        .every((link) => link.getAttribute("href")?.startsWith("/")),
    ).toBe(true);
    expect(
      screen
        .getByRole("link", { name: /Commercial experience/ })
        .getAttribute("href"),
    ).toBe("/#commercial-modernization");
  });

  it("generates canonical and social metadata for both content types", async () => {
    const entries = [...projects, study, insomnia];
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

describe("collaborative project integration", () => {
  it("features one project with a case-study CTA rather than PR cards", () => {
    render(createElement(InsomniaFeature));
    expect(screen.getByRole("heading", { name: insomnia.title })).toBeDefined();
    expect(
      screen
        .getAllByRole("link")
        .every(
          (link) => link.getAttribute("href") === `/work/${insomnia.slug}`,
        ),
    ).toBe(true);
  });

  it("renders the full collaborative case with working local evidence anchors", async () => {
    const { container } = render(
      await WorkPage({ params: Promise.resolve({ slug: insomnia.slug }) }),
    );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      insomnia.title,
    );
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(6);
    expect(
      sitemap().some(
        ({ url }) => url === absoluteUrl(`/work/${insomnia.slug}`),
      ),
    ).toBe(true);
    for (const link of container.querySelectorAll('a[href^="#"]')) {
      expect(
        container.querySelector(link.getAttribute("href")!),
      ).not.toBeNull();
    }
    for (const { number } of insomniaReferences) {
      const link = container.querySelector(
        `a[href="${insomnia.repository}/pull/${number}"]`,
      );
      expect(link?.getAttribute("rel")).toContain("noreferrer");
    }
    expect(screen.queryByText(/Open demo/i)).toBeNull();
    expect(screen.getByText(/existing open-source platform/i)).toBeDefined();
  });

  it("routes the approach example to inventory, with a matching CTA", () => {
    render(createElement(AboutSection));
    expect(
      screen
        .getByRole("link", { name: /Trace the inventory workflow/ })
        .getAttribute("href"),
    ).toBe("/work/insomnia-feeder#inventory");
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
