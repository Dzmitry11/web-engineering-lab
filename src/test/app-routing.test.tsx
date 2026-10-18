import { QueryClient } from "@tanstack/react-query";
import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { projects, SITE_URL } from "@/content/site";
import { routeTree } from "@/routeTree.gen";

async function loadAt(path: string) {
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: [path] }),
  });
  await router.load();
  return router.state.matches;
}

function failedMatches(matches: Awaited<ReturnType<typeof loadAt>>) {
  return matches.filter((m) => m.status !== "success").map((m) => [m.routeId, String(m.error)]);
}

// Resolve routes without rendering: jsdom never loads stylesheets, and React
// holds the whole render until any stylesheet link in the root head loads.
describe("App routing", () => {
  it("uses GitHub Pages metadata instead of Lovable branding", () => {
    expect(SITE_URL).toBe("https://dzmitry11.github.io/web-engineering-lab");
    expect(SITE_URL).not.toContain("lovable");
  });

  it("provides live website links for production projects", () => {
    expect(projects.find((project) => project.key === "dinlia")?.url).toBe("https://www.dinlia.se");
    expect(projects.find((project) => project.key === "oriole")?.url).toBe("https://oriolepartner.pl");
    expect(projects.find((project) => project.key === "ipdiary")?.url).toBe("https://ipdiary.eu");
    expect(projects.find((project) => project.key === "scania")?.url).toBeUndefined();
  });

  it("loads the index route without a loader error", async () => {
    const matches = await loadAt("/");

    expect(failedMatches(matches)).toEqual([]);
  });

  it("loads an unknown path without a loader error", async () => {
    const matches = await loadAt("/this-route-does-not-exist");

    expect(failedMatches(matches)).toEqual([]);
  });
});
