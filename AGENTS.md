<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Fajri's portfolio

Personal portfolio of Mochamad Fajri Ilham Nurdin, in English and Indonesian, with light and dark themes.

## Commands
- `npm run dev`: start the dev server
- `npm run build`: production build
- `npm run check`: lint, typecheck and build

## Where things live
- `src/content/`: all site text (`i18n.ts`, `profile.ts`, `projects.ts`) and the case-study markdown in `studi-kasus/`
- `src/components/sites/portfolio/`: page components
- `src/app/portfolio.css`: site styles
- `public/studi-kasus/<case>/images/`: case-study figures; a `-en` version is shown in both languages when present
- `/admin`: content editor, available only in development

## Content rules
- No invented metrics: every number must come from the case files.
- Asset-management project: show only the front-facing visuals.

## Deploy
Pushing to `main` on GitHub deploys to Vercel automatically.
