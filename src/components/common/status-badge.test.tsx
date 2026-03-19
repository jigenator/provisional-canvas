import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusBadge } from "./status-badge";

describe("StatusBadge", () => {
  it("renders the default label for each status", () => {
    const statuses = [
      { status: "running" as const, label: "Running" },
      { status: "attention" as const, label: "Needs Attention" },
      { status: "completed" as const, label: "Completed" },
      { status: "error" as const, label: "Error" },
      { status: "idle" as const, label: "Idle" },
    ];
    for (const { status, label } of statuses) {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(screen.getByText(label)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders custom children as label override", () => {
    render(<StatusBadge status="running">Custom Label</StatusBadge>);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders a dot indicator by default", () => {
    render(<StatusBadge status="running" />);
    expect(screen.getByTestId("status-dot")).toBeInTheDocument();
  });

  it("hides the dot indicator when showDot is false", () => {
    render(<StatusBadge status="running" showDot={false} />);
    expect(screen.queryByTestId("status-dot")).not.toBeInTheDocument();
  });

  it("applies pulse animation for running status dot", () => {
    render(<StatusBadge status="running" />);
    expect(screen.getByTestId("status-dot")).toHaveClass("animate-pulse");
  });

  it("does not apply pulse animation for non-running status dot", () => {
    render(<StatusBadge status="completed" />);
    expect(screen.queryByTestId("status-dot")).not.toHaveClass("animate-pulse");
  });
});
