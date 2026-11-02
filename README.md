# nikitamaksimov.dev

Personal portfolio of Nikita Maksimov, Senior Frontend Engineer with commercial
Node.js experience. The site presents commercial experience separately from
personal engineering experiments and case studies.

Live: https://www.nikitamaksimov.dev

## Stack and architecture

- Next.js App Router, React and TypeScript
- Three.js for the lazy-loaded kinetic hero sculpture
- Tailwind CSS and custom styles in `app/globals.css`
- Zod for project content validation
- Vitest, Testing Library, Oxlint and Prettier for quality checks
- Vercel Analytics in production

`content/profile.ts`, `content/experience.ts` and `content/projects.ts` hold the
portfolio data. `app/page.tsx` composes the homepage from section components.
`app/work/[slug]/page.tsx` generates project case studies from the validated data.
The hero serves a rendered image of its assembled sculpture immediately. A
separate, lazy-loaded Three.js scene animates ten beveled modules through a
14-second opening, cassette exchange and reassembly. The two cassette designs
alternate between cycles without resetting the visible object. An illuminated
backbone stays active during the exchange. Pointer tilt and module hover are
secondary to the automatic choreography. Geometry, lighting and the studio
environment are procedural; no external models or environment textures load.

The scene pauses offscreen, in hidden tabs and with its pause control. System
reduced-motion changes restore the assembled pose; no-JS, failed-chunk and WebGL
fallbacks retain `public/hero/sculpture-rest.webp`, rendered from the same camera
and lighting. Regenerate that image when changing the model or its lighting.
The mobile layout does not initialize WebGL. Animation loading never gates the
hero text or actions. Project cards and case studies render on the server. The
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
is enabled only when `NODE_ENV` is `production`. Next.js downloads the Geist fonts
at build time, so a production build requires access to Google Fonts.

## Quality checks

```sh
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

Use `npm run format` to apply formatting intentionally. Tests cover content
validation, metadata routes, motion behavior and choreography continuity. Review
narrow and wide layouts,
keyboard navigation, reduced motion, case-study navigation and external links
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
