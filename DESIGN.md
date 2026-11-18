# Design direction — Military Strategy Database

A scoped study reference of six self-authored records. Since 2026-11-19 the site uses the shared **Reader
shell** (see `READER.md`): `app/reader-shell.css`, `components/reader-shell.tsx` and
`tests/reader-shell.test.tsx` are copied byte for byte from content-techblog-web. Geist via `next/font`
(variable on `<html>`), `--rs-*` tokens in light and dark; no site colour tokens remain.

- Structure: one h1 and lede, a live search (not a form, so the query never leaves the browser), era chips
  (`aria-pressed`) whose counts follow the search, a `role="status"` count, then every record with its
  objective, constraint and lesson in place. Nothing opens at the end of the page.
- Empty state: "No records match" with a Show all records button that clears both the search and the era.
- Floor: text ≥ 12px, controls ≥ 44px, 4.5:1 text contrast, forced colours, no horizontal scroll at 320px,
  footer link back to https://bookchaowalit.com/.
- Honesty: educational reference and sample dataset; not operational guidance, a field manual, or a complete
  historical archive.
