import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { AppShell } from "./app-shell";

describe("AppShell", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the top bar", () => {
    render(<AppShell />);
    expect(screen.getByText("Provisional Canvas")).toBeInTheDocument();
  });

  it("renders the left panel", () => {
    render(<AppShell />);
    expect(screen.getByText("Tools")).toBeInTheDocument();
  });

  it("renders the inbox panel", () => {
    render(<AppShell />);
    expect(screen.getByText("Inbox")).toBeInTheDocument();
  });

  it("renders the workspace", () => {
    render(<AppShell />);
    expect(screen.getByText("Agent Workspace")).toBeInTheDocument();
  });

  it("renders the bottom panel", () => {
    render(<AppShell />);
    expect(screen.getByText("Terminal")).toBeInTheDocument();
  });
});
