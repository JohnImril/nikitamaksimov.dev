# nikitamaksimov.dev

Personal portfolio of Nikita Maksimov, Senior Frontend Engineer with commercial
Node.js experience. The site presents commercial experience separately from
personal engineering experiments and case studies.

Live: https://www.nikitamaksimov.dev

## Stack and architecture

- Next.js App Router, React and TypeScript
- Three.js for the lazy-loaded displaced hero sphere
- Tailwind CSS and custom styles in `app/globals.css`
- Zod for project content validation
- Vitest, Testing Library, Oxlint and Prettier for quality checks
- Vercel Analytics in production

`content/profile.ts`, `content/experience.ts` and `content/projects.ts` hold the
portfolio data. `app/page.tsx` composes the homepage from section components.
`app/work/[slug]/page.tsx` generates project case studies from the validated data.
Insomnia is a featured collaborative project with a dedicated server-rendered
case study at `/work/insomnia-feeder`, separate from the personal-project demo
schema. `content/insomnia.ts` holds its narrative and curated evidence;
`components/case-study/insomnia-visuals.tsx` contains labeled, responsive workflow
diagrams rather than production UI replicas. Research scope, evidence, and
intentional limitations are recorded in [the research notes](docs/insomnia-research.md).
The hero uses [Animated Displaced Sphere by Pavel Mazhuga / Codrops](https://github.com/pavel-mazhuga/codrops-tutorial-distorted-sphere-custom-material),
from source commit `83bb3d2639460e4a5c478e23414356957968a8d8`. Its original
vertex/fragment shaders, 200-subdivision icosahedron, finite-difference normals,
physical material, ambient/directional light and 1.1 animation speed are retained.
Three.js is pinned to the original r165 to preserve its lighting and iridescence.
The GLSL uses a small `onBeforeCompile` bridge in place of the demo's React Three
Fiber / CustomShaderMaterial wrapper; no demo UI or orbit controls are loaded.
Only framing, a transparent background and the lifecycle integration differ.
The full original MIT notice is distributed in
`public/hero/displaced-sphere.LICENSE.txt`.

The sphere is a separate, lazy-loaded enhancement. Its geometry is constructed in
a worker so setup does not block the page. A matching transparent rendered still
is served immediately on desktop, independently of the Three.js chunk, and retained
until shaders and the first frame are ready. Regenerate
`public/hero/displaced-sphere-rest.webp` from the renderer at time zero when
changing the scene. The shader clock pauses offscreen, in hidden tabs and with
the pause control. System reduced-motion changes restore the resting pose;
no-JS, failed-chunk, worker and WebGL fallbacks retain the still. The mobile layout
does not download the desktop still or initialize WebGL. The desktop still has
high fetch priority because it is the largest contentful paint element. Animation
loading never gates the hero text or actions.
Project cards and case studies render on the server. The
homepage connects four engineering strengths to commercial examples and public
projects, with Node.js and AI scope described separately. Shared styles support
reduced-motion preferences.

`lib/metadata.ts` owns the canonical origin and case-study metadata. The root
layout provides social metadata and Person/WebSite structured data. Metadata
routes generate the Open Graph image, sitemap and robots configuration. Project
images and the site icon live in `public/`.

## Local development

Use Node.js 24 (24.15 or newer) and npm. CI uses Node.js 24.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Edit content in `content/` and UI in `components/`.
No environment variables, credentials or backend services are required. Analytics
is enabled only for production builds on Vercel (`VERCEL=1`), where the analytics
endpoint is available. Next.js downloads the Geist fonts at build time, so a
production build requires access to Google Fonts.

## Quality checks

```sh
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

Use `npm run format` to apply formatting intentionally. Tests cover content
validation, metadata routes and motion lifecycle behavior. Review narrow and wide
layouts, keyboard navigation, reduced motion, case-study navigation and external links
when changing UI. GitHub Actions runs the checks above after `npm ci` for pushes
and pull requests targeting `main`.

## Production and deployment

```sh
npm run build
npm start
```

The production server listens on port 3000 by default. The project uses standard
Next.js deployment and includes Vercel Analytics; `.vercel/` contains local hosting
configuration and is ignored. On Vercel, use the Next.js preset, `npm ci` and
`npm run build`. Other hosting must support the Next.js server and image routes.
Production publishing remains a separate hosting action; the CI workflow only
validates changes and does not deploy.

Keep the canonical origin in `lib/metadata.ts` synchronized with the production
host if the domain changes. Do not commit `.next/`, `out/`, `coverage/`, local
hosting configuration or TypeScript `*.tsbuildinfo` compiler caches.
