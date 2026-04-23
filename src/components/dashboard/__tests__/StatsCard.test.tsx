import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatsCard } from "../StatsCard";

describe("StatsCard", () => {
  it("renders title and value", () => {
    render(<StatsCard title="Revenue" value="$1,234" change="+12%" />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$1,234")).toBeInTheDocument();
    // The change element contains "+12% from last month" — match the change prefix
    expect(screen.getByText(/^\+12%/)).toBeInTheDocument();
  });

  it("shows positive change in green", () => {
    render(<StatsCard title="Users" value="100" change="+5%" />);
    const changeEl = screen.getByText(/^\+5%/);
    expect(changeEl.className).toMatch(/green|emerald|text-green/);
  });

  it("shows negative change in red", () => {
    render(<StatsCard title="Churn" value="2%" change="-3%" />);
    const changeEl = screen.getByText(/^-3%/);
    expect(changeEl.className).toMatch(/red|text-red|destructive/);
  });
});
