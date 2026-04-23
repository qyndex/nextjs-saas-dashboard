import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "skip", "keep")).toBe("base keep");
  });

  it("deduplicates Tailwind conflicts — last wins", () => {
    const result = cn("text-sm", "text-lg");
    expect(result).toBe("text-lg");
  });

  it("handles undefined and null gracefully", () => {
    expect(cn("a", undefined, null as unknown as string, "b")).toBe("a b");
  });

  it("returns empty string when no args given", () => {
    expect(cn()).toBe("");
  });
});
