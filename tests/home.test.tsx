// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import nextConfig from "@/next.config";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("home page (server render)", () => {
  it("renders one h1, every record with its brief, and the scope notes", () => {
    const html = renderToString(<Home />);
    expect(html.match(/<h1/g)).toHaveLength(1);
    for (const title of ["The narrow crossing", "The long supply line", "The pause before contact"]) expect(html).toContain(title);
    expect(html).toContain("A narrow route changes the value of time, information, and formation.");
    expect(html).toContain("Educational reference · sample dataset");
    expect(html).toContain("not operational guidance, a field manual, or a complete historical archive");
    expect(html).toContain('href="https://bookchaowalit.com/"');
  });
});

describe("home page (mounted)", () => {
  let root: Root;
  let host: HTMLDivElement;
  const button = (t: string) => [...host.querySelectorAll("button")].find((b) => b.textContent?.trim().startsWith(t)) as HTMLButtonElement;
  const press = (el: Element) => act(() => { el.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
  const titles = () => [...host.querySelectorAll(".rs-entry h3")].map((h) => h.textContent);
  const chips = () => [...host.querySelectorAll(".rs-chip")].map((c) => c.textContent);
  const search = () => host.querySelector<HTMLInputElement>("input[type='search']")!;
  const type = (value: string) => act(() => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(search(), value);
    search().dispatchEvent(new Event("input", { bubbles: true }));
  });

  beforeEach(() => {
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
    act(() => root.render(<Home />));
  });
  afterEach(() => { act(() => root.unmount()); host.remove(); });

  it("searches live, counts each era chip within the search, and Clear puts focus back", () => {
    expect(titles()).toHaveLength(6);
    type("information");
    expect(titles()).toEqual(["The divided signal", "The decoy route"]);
    expect(chips()).toEqual(["All eras2", "Antiquity0", "Early modern0", "Industrial1", "Modern0", "Contemporary1"]);
    expect(host.querySelector(".rs-count")!.textContent).toBe("Showing 2 of 6 records for “information”");
    press(button("Clear"));
    expect(titles()).toHaveLength(6);
    expect(document.activeElement).toBe(search());
  });

  it("filters by era and offers a way back when nothing matches", () => {
    press(button("Contemporary"));
    expect(titles()).toEqual(["The decoy route", "The pause before contact"]);
    type("ridge");
    expect(host.querySelector(".rs-empty h3")!.textContent).toBe("No records match");
    press(button("Show all records"));
    expect(titles()).toHaveLength(6);
    expect(button("All eras").getAttribute("aria-pressed")).toBe("true");
    // The pressed button left with the empty state: focus goes back to the search field, like Clear.
    expect(document.activeElement).toBe(search());
  });
});

describe("era filter group", () => {
  it("keeps its list role and name in Safari/VoiceOver (list-style: none drops list semantics without role=list)", () => {
    const html = renderToString(<Home />);
    expect(html).toMatch(/<ul class="site-chips" role="list" aria-label="Filter by era">/);
  });
});

describe("site files", () => {
  it("points robots and the sitemap at military.bookchaowalit.com and redirects /more-projects", async () => {
    expect(robots().sitemap).toBe("https://military.bookchaowalit.com/sitemap.xml");
    expect(sitemap()[0].url).toBe("https://military.bookchaowalit.com/");
    expect(await nextConfig.redirects!()).toContainEqual({ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true });
  });
});
