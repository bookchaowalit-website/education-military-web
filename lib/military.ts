// Self-authored study records and the filter/selection logic the page uses.

export type RecordItem = {
  id: string;
  title: string;
  era: string;
  theatre: string;
  objective: string;
  constraint: string;
  lesson: string;
  tags: string[];
};

export const records: RecordItem[] = [
  { id: "M-01", title: "The narrow crossing", era: "Antiquity", theatre: "River crossing", objective: "Move a smaller force through a constrained route.", constraint: "Terrain compresses movement into one visible threshold.", lesson: "A narrow route changes the value of time, information, and formation.", tags: ["terrain", "movement"] },
  { id: "M-02", title: "The long supply line", era: "Early modern", theatre: "Logistics", objective: "Keep an expedition supplied beyond its base.", constraint: "Every extra mile increases exposure and coordination cost.", lesson: "Operational reach is limited by the system that feeds it.", tags: ["logistics", "reach"] },
  { id: "M-03", title: "The divided signal", era: "Industrial", theatre: "Command", objective: "Coordinate separate units under imperfect communication.", constraint: "Orders arrive late and local context moves faster than the plan.", lesson: "A resilient intent survives when a detailed instruction cannot.", tags: ["command", "information"] },
  { id: "M-04", title: "The defended ridge", era: "Modern", theatre: "Defence", objective: "Hold a position whose value comes from visibility.", constraint: "The position is strong only while observation remains clear.", lesson: "Defensive advantage is a relationship, not a permanent property.", tags: ["terrain", "defence"] },
  { id: "M-05", title: "The decoy route", era: "Contemporary", theatre: "Deception", objective: "Shape an opponent's expectation of where effort is landing.", constraint: "A signal must remain plausible without becoming the plan.", lesson: "Deception works through attention and cost, not theatrical surprise.", tags: ["deception", "information"] },
  { id: "M-06", title: "The pause before contact", era: "Contemporary", theatre: "Decision", objective: "Use a deliberate pause to improve the next choice.", constraint: "Waiting has a cost when the surrounding system keeps changing.", lesson: "A pause is strategic only when it buys better information.", tags: ["decision", "timing"] },
];

export const ALL_ERAS = "All eras";

export const eras = [ALL_ERAS, ...Array.from(new Set(records.map((record) => record.era)))];


// Era filter plus a case-insensitive search over title, theatre and tags (surrounding spaces ignored).
export function filterRecords(items: RecordItem[], era: string, query: string): RecordItem[] {
  const needle = query.trim().toLowerCase();
  return items.filter((record) => {
    const matchesEra = era === ALL_ERAS || record.era === era;
    const haystack = `${record.title} ${record.theatre} ${record.tags.join(" ")}`.toLowerCase();
    return matchesEra && haystack.includes(needle);
  });
}

// The brief must show a record the index lists: the chosen one if visible, else the first visible, else none.
export function pickSelected(visible: RecordItem[], selectedId: string): RecordItem | undefined {
  return visible.find((record) => record.id === selectedId) ?? visible[0];
}
