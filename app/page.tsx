"use client";

import { useMemo, useState } from "react";
import { ALL_ERAS, eras, filterRecords, pickSelected, records } from "@/lib/military";

export default function Home() {
  const [era, setEra] = useState(ALL_ERAS);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(records[0].id);
  const filtered = useMemo(() => filterRecords(records, era, query), [era, query]);
  const selected = pickSelected(filtered, selectedId);

  return (
    <main className="field-shell">
      <header className="topbar">
        <div className="brand-mark" aria-label="Military Strategy Database">MSD<span> / 01</span></div>
        <div className="topbar-note">EDUCATIONAL REFERENCE · SAMPLE DATASET</div>
        <div className="status-dot"><i /> indexed</div>
      </header>

      <section className="masthead">
        <div className="coordinate">13°45&apos;N / 100°30&apos;E</div>
        <h1>Military<br /><em>Strategy</em> Database</h1>
        <p>Compare the pressure points behind a campaign: objective, constraint, terrain, and the lesson that survives the map.</p>
      </section>

      <div className="workbench">
        <aside className="filter-rail" aria-label="Reference filters">
          <div className="rail-heading">INDEX / FILTER</div>
          <label htmlFor="record-search">Find a record</label>
          <input id="record-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="title or keyword" />
          <fieldset>
            <legend>Era</legend>
            {eras.map((item) => <button key={item} className={era === item ? "filter active" : "filter"} onClick={() => setEra(item)} aria-pressed={era === item}>{item}</button>)}
          </fieldset>
          <div className="scope-note"><strong>Scope note</strong><br />Self-authored study records. This is not operational guidance or a complete historical archive.</div>
        </aside>

        <section className="index-panel" aria-label="Strategy records">
          <div className="panel-title"><span>RECORD INDEX</span><b>{filtered.length.toString().padStart(2, "0")} ENTRIES</b></div>
          {filtered.map((record, index) => <button key={record.id} className={selected?.id === record.id ? "record active" : "record"} onClick={() => setSelectedId(record.id)}>
            <span className="record-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="record-main"><strong>{record.title}</strong><small>{record.theatre} / {record.era}</small></span>
            <span className="record-tags">{record.tags.join(" · ")}</span>
            <span className="arrow" aria-hidden="true">↗</span>
          </button>)}
          {filtered.length === 0 && <p className="empty">No records match this filter. Try a broader term.</p>}
        </section>

        <article className="brief-panel" aria-live="polite">
          {selected ? (
            <>
              <div className="brief-top"><span>{selected.id}</span><span>{selected.era.toUpperCase()}</span></div>
              <div className="map-mark" aria-hidden="true"><span /><span /><span /><span /><b>+</b></div>
              <p className="eyebrow">CASE BRIEF / {selected.theatre.toUpperCase()}</p>
              <h2>{selected.title}</h2>
              <dl>
                <div><dt>OBJECTIVE</dt><dd>{selected.objective}</dd></div>
                <div><dt>CONSTRAINT</dt><dd>{selected.constraint}</dd></div>
                <div><dt>LESSON</dt><dd>{selected.lesson}</dd></div>
              </dl>
              <div className="brief-footer"><span>READING STATUS</span><strong>REFERENCE ONLY</strong></div>
            </>
          ) : (
            <p className="empty">No record selected. Clear the search or pick another era to open a case brief.</p>
          )}
        </article>
      </div>
      <footer><span>Military Strategy Database / 2026</span><span>Designed as a study instrument, not a field manual.</span></footer>
    </main>
  );
}
