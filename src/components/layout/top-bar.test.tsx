import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { TopBar } from "./top-bar";

describe("TopBar", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("renders the default canvas name", () => {
    render(<TopBar />);
    expect(screen.getByText("Provisional Canvas")).toBeInTheDocument();
  });

  it("renders a custom canvas name", () => {
    render(<TopBar canvasName="My Workspace" />);
    expect(screen.getByText("My Workspace")).toBeInTheDocument();
  });

  it("renders the settings button", () => {
    render(<TopBar />);
    expect(screen.getByRole("button", { name: /settings/i })).toBeInTheDocument();
  });

  it("renders the theme toggle", () => {
    render(<TopBar />);
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });
});
