import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("home page", () => {
  it("renders the index, the first brief and the sample-data scope notes", () => {
    const html = renderToString(<Home />);
    expect(html).toContain("Strategy</em> Database");
    expect(html).toContain("06<!-- --> ENTRIES");
    for (const title of ["The narrow crossing", "The long supply line", "The pause before contact"]) expect(html).toContain(title);
    expect(html).toContain("CASE BRIEF / <!-- -->RIVER CROSSING");
    expect(html).toContain("EDUCATIONAL REFERENCE · SAMPLE DATASET");
    expect(html).toContain("This is not operational guidance or a complete historical archive.");
  });
});
