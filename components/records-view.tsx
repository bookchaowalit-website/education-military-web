"use client";

import { useRef, useState } from "react";
import { EmptyState, Reader, ReaderFoot, ReaderHead, ReaderTop, ResultCount, SearchForm, Tags } from "@/components/reader-shell";
import { ALL_ERAS, eras, filterRecords, records } from "@/lib/military";

// The strategy records on the Reader shell: a live search, era chips whose counts follow the search, and each
// record with its brief (objective, constraint, lesson) in place, so nothing opens at the end of the page.

const SOURCE = "https://github.com/bookchaowalit-website/education-military-web";

export function RecordsView() {
  const [era, setEra] = useState(ALL_ERAS);
  const [query, setQuery] = useState("");
  // "Show all" leaves with the empty state it sits in, so it puts focus back in the search field, like Clear.
  const toolbarRef = useRef<HTMLDivElement>(null);
  const matching = filterRecords(records, ALL_ERAS, query);
  const shown = filterRecords(records, era, query);
  const q = query.trim();
  return (
    <Reader>
      <ReaderTop name="Military Strategy Database" tagline="Study records" links={[{ href: "#records", label: "Records" }]} />
      <main id="main" className="rs-main">
        <ReaderHead
          eyebrow="Educational reference · sample dataset"
          title="Military Strategy Database"
          lede="Compare the pressure points behind a campaign: objective, constraint, terrain, and the lesson that survives the map."
        />
        <section aria-labelledby="records">
          <div className="rs-section-head"><h2 id="records">Records</h2></div>
          <div className="rs-toolbar" ref={toolbarRef}>
            <SearchForm label="Find a record" placeholder="Title, theatre or tag" value={query} onValueChange={setQuery} onClear={() => setQuery("")} />
            <ul className="site-chips" aria-label="Filter by era">
              {eras.map((item) => (
                <li key={item}>
                  <button type="button" className="rs-chip" aria-pressed={era === item} onClick={() => setEra(item)}>
                    {item}<small>{item === ALL_ERAS ? matching.length : matching.filter((record) => record.era === item).length}</small>
                  </button>
                </li>
              ))}
            </ul>
            <ResultCount shown={shown.length} total={records.length} noun="record" query={q || undefined} filter={era === ALL_ERAS ? undefined : era} />
          </div>
          {shown.length === 0 ? (
            <EmptyState
              title="No records match"
              headingLevel={3}
              action={<button type="button" className="rs-plain" onClick={() => { setQuery(""); setEra(ALL_ERAS); toolbarRef.current?.querySelector<HTMLInputElement>('input[type="search"]')?.focus(); }}>Show all records</button>}
            >
              Try a broader word, or another era.
            </EmptyState>
          ) : (
            <ul className="rs-list" role="list">
              {shown.map((record) => (
                <li key={record.id}>
                  <article className="rs-entry">
                    <h3>{record.title}</h3>
                    <p className="rs-entry-meta">{record.id} · {record.era} · {record.theatre}</p>
                    <Tags tags={record.tags} />
                    <dl className="site-facts">
                      <div><dt>Objective</dt><dd>{record.objective}</dd></div>
                      <div><dt>Constraint</dt><dd>{record.constraint}</dd></div>
                      <div><dt>Lesson</dt><dd>{record.lesson}</dd></div>
                    </dl>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <ReaderFoot source={SOURCE} note="Self-authored study records for reference only: not operational guidance, a field manual, or a complete historical archive." />
    </Reader>
  );
}
