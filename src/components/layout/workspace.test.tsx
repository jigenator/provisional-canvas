import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Workspace } from "./workspace";

describe("Workspace", () => {
  it("renders children", () => {
    render(<Workspace>Workspace content</Workspace>);
    expect(screen.getByText("Workspace content")).toBeInTheDocument();
  });

  it("renders the context bar with default title", () => {
    render(<Workspace>Content</Workspace>);
    expect(screen.getByText("Agent Workspace")).toBeInTheDocument();
  });

  it("renders bottomPanel slot outside the scroll area", () => {
    render(<Workspace bottomPanel={<div>Bottom panel content</div>}>Main content</Workspace>);
    expect(screen.getByText("Bottom panel content")).toBeInTheDocument();
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });
});
