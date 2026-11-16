# Senior Frontend portfolio audit

Audit date: 2026-11-17. Branch: `polish/senior-portfolio-audit`.

## Changes and evidence

- Fixed the Experience CTA's stray question mark and Feeder's duplicated external-link arrow. Checked the rendered links across the homepage and all six case studies; no other doubled arrows were found.
- Made the API comparison's controlled local scope visible in its heading and subtitle. Preserved every value, percentage, baseline/rerun distinction, N+1 limitation, and timing boundary. It is not a historical production improvement.
- Re-read public PRs #573, #782, #995, #1035 and #1159 and their discussion timelines. The ownership example now connects the stale-cache concern raised in #1035, the author's correction, and the merged nginx cache policy. See `insomnia-research.md` for direct sources.
- Consolidated the commercial case from six sections into four: consumer constraints, responsibility, migration trade-off, and supported outcome. No application counts, timings or additional results were invented.
- Updated stale research notes that still described the old diagram-only case.
- `October 2024 – Present`, the Senior Frontend Engineer role, personal-project labels, and the three separate commercial metrics are unchanged. No new dependency or visual redesign.

## Completed verification

- `npm run format:check`: passed.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run test`: 7 files, 25 tests passed. Run with child-process permissions because the sandbox previously rejected Vitest subprocesses.
- `npm run build`: passed; production static generation completed for all routes.
- HTTP smoke check against a local production server, `http://127.0.0.1:3100`, Node 24.18.0 / Next.js 16.4.5 on Windows: homepage and all six cases returned 200; canonical links and JSON-LD parsed; local fragment targets existed.
- All nine Feeder WebP URLs returned 200 with `image/webp`, byte-identical to repository files. Source files total 344,068 bytes. This is asset size, not measured page transfer.
- Source/rendered markup inspection: homepage resting-pose image and case hero are eager/high priority; gallery and Selected Work images are lazy. Product images have intrinsic dimensions; mobile hero has its own source dimensions. Existing keyboard menu dismissal, focus-visible CSS and reduced-motion logic remain in place. This does not substitute for browser verification.

## Outstanding verification

The browser connector reports `The browser access host is unavailable`. A request to expose the local preview in a normal Chrome window is pending. The 360/390/768/1280/1600px visual matrix, keyboard interactions, contrast, overflow, full-size link interaction and observed layout shifts are not yet verified in this audit.

PageSpeed Insights mobile requests for the public homepage and Insomnia URL both returned HTTP 429 (`RESOURCE_EXHAUSTED`, quota exceeded). No Lighthouse scores, LCP, CLS or field INP were obtained. No performance conclusion is inferred from HTTP checks, build duration or file size.

The PR should remain draft until browser verification is complete. No deploy or merge was performed.
