# Military Strategy Database

An educational study page over six self-authored, abstract campaign-pattern records (objective, constraint,
lesson). Filter by era, search title, theatre or tags, and open one case brief at a time. Sample content only, kept
in the code. It is not a historical archive and not operational guidance.

Live: https://military.bookchaowalit.com (deployed by Vercel CLI; it can lag `main`, see `PRODUCT.md`).

## What it does not do

- No battle analyses, thinker profiles, campaign maps, timelines or geospatial views. No sources or expert review.
  No account or storage.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: record filter/selection logic, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `lib/military.ts`: the six records, the era list, `filterRecords` and `pickSelected` (used by the page).
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when
  `NEXT_PUBLIC_SENTRY_DSN` is unset.
