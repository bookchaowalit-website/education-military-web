# Military Strategy Database — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `military-strategy-db`) on 2026-10-23.

## What it is

A client-only study page over six hard-coded, self-authored records such as "The narrow crossing". Each record is
an abstract pattern (objective, constraint, lesson), not a real battle. The UI labels it "SAMPLE DATASET".

## Who it is for

A portfolio visitor who wants to see a calm reference layout: filter rail, index and one open brief.

## What works today

1. Filter by era (Antiquity to Contemporary) and search title, theatre or tags (case-insensitive, spaces trimmed).
2. Select a record to open its brief. If the filter hides it, the first listed record opens; if nothing matches,
   the brief says no record is selected.
3. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No battle analyses, thinker profiles, campaign maps, interactive timelines or geospatial visualization (claims
  removed from the portfolio card in the 2026-10 review). No sources, citations or expert review.
- Search does not look inside the objective, constraint or lesson text.
- No account, storage or sync. No product analytics beyond Vercel Analytics.

## Live URL and deploy state

- Live: https://military.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-military-frontend` has no Git link and is deployed only by CLI. The last
  production deployment is 2026-10-08 (CLI, Next 16.3.8): the Next 16.4.2 security patch was not deployed because
  the Vercel free-plan daily deployment limit was hit on 2026-10-23. A push to `main` does not deploy; the live site
  lags `main` until the coordinator deploys it and the owner connects Vercel Git to this repository (owner action
  D9). `NEXT_PUBLIC_SENTRY_DSN` is already set on the Vercel project (Sentry project `education-military-web`, org
  `personal-yu0`).

## Boundaries

- Browser-only: no API routes, no server data. Educational framing only; not advice for real-world use of force.
