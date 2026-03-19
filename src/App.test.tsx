import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the app shell with canvas name", () => {
    render(<App />);
    expect(screen.getByText("Provisional Canvas")).toBeInTheDocument();
  });
});
