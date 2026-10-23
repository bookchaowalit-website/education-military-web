import { describe, expect, it } from "vitest";
import { ALL_ERAS, eras, filterRecords, pickSelected, records } from "@/lib/military";

const ids = (items: { id: string }[]) => items.map((r) => r.id);

describe("records", () => {
  it("holds six self-authored records with unique ids", () => {
    expect(records).toHaveLength(6);
    expect(new Set(ids(records)).size).toBe(6);
  });

  it("derives era filters from the data without duplicates", () => {
    expect(eras).toEqual([ALL_ERAS, "Antiquity", "Early modern", "Industrial", "Modern", "Contemporary"]);
  });
});

describe("filterRecords", () => {
  it("returns everything for all eras and an empty query", () => {
    expect(filterRecords(records, ALL_ERAS, "")).toHaveLength(6);
  });

  it("filters by era", () => {
    expect(ids(filterRecords(records, "Contemporary", ""))).toEqual(["M-05", "M-06"]);
  });

  it("searches title, theatre and tags case-insensitively", () => {
    expect(ids(filterRecords(records, ALL_ERAS, "TERRAIN"))).toEqual(["M-01", "M-04"]);
    expect(ids(filterRecords(records, ALL_ERAS, "logistics"))).toEqual(["M-02"]);
    expect(ids(filterRecords(records, ALL_ERAS, "ridge"))).toEqual(["M-04"]);
  });

  it("ignores surrounding spaces in the query", () => {
    expect(ids(filterRecords(records, ALL_ERAS, "  ridge  "))).toEqual(["M-04"]);
  });

  it("combines era and query", () => {
    expect(filterRecords(records, "Antiquity", "information")).toEqual([]);
    expect(ids(filterRecords(records, "Industrial", "information"))).toEqual(["M-03"]);
  });
});

describe("pickSelected", () => {
  it("keeps the chosen record when it is listed", () => {
    expect(pickSelected(records, "M-03")?.id).toBe("M-03");
  });

  it("opens the first listed record when the filter hides the chosen one", () => {
    // Regression: the brief kept showing M-01 after the Modern filter hid it.
    expect(pickSelected(filterRecords(records, "Modern", ""), "M-01")?.id).toBe("M-04");
  });

  it("returns nothing when no record matches", () => {
    // Regression: with zero matches the brief still showed a record next to "No records match".
    expect(pickSelected(filterRecords(records, ALL_ERAS, "zzz"), "M-01")).toBeUndefined();
  });
});
