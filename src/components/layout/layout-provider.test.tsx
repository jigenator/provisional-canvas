import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { LayoutProvider, useLayout } from "./layout-provider";

function TestConsumer() {
  const layout = useLayout();
  return (
    <div>
      <span data-testid="left-collapsed">{String(layout.leftPanel.collapsed)}</span>
      <span data-testid="left-size">{layout.leftPanel.size}</span>
      <span data-testid="inbox-collapsed">{String(layout.inbox.collapsed)}</span>
      <span data-testid="inbox-size">{layout.inbox.size}</span>
      <span data-testid="bottom-collapsed">{String(layout.bottomPanel.collapsed)}</span>
      <span data-testid="bottom-size">{layout.bottomPanel.size}</span>
      <button onClick={() => layout.togglePanel("left")}>toggle-left</button>
      <button onClick={() => layout.togglePanel("inbox")}>toggle-inbox</button>
      <button onClick={() => layout.togglePanel("bottom")}>toggle-bottom</button>
      <button onClick={() => layout.resizePanel("left", 300)}>resize-left-300</button>
      <button onClick={() => layout.resizePanel("left", 100)}>resize-left-100</button>
      <button onClick={() => layout.resizePanel("left", 999)}>resize-left-999</button>
    </div>
  );
}

describe("LayoutProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("provides default panel sizes", () => {
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    expect(screen.getByTestId("left-size").textContent).toBe("240");
    expect(screen.getByTestId("inbox-size").textContent).toBe("280");
    expect(screen.getByTestId("bottom-size").textContent).toBe("200");
  });

  it("provides default collapsed states as false", () => {
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    expect(screen.getByTestId("left-collapsed").textContent).toBe("false");
    expect(screen.getByTestId("inbox-collapsed").textContent).toBe("false");
    expect(screen.getByTestId("bottom-collapsed").textContent).toBe("false");
  });

  it("toggles panel collapsed state", async () => {
    const user = userEvent.setup();
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    await user.click(screen.getByText("toggle-left"));
    expect(screen.getByTestId("left-collapsed").textContent).toBe("true");
    await user.click(screen.getByText("toggle-left"));
    expect(screen.getByTestId("left-collapsed").textContent).toBe("false");
  });

  it("resizes panel within constraints", async () => {
    const user = userEvent.setup();
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    await user.click(screen.getByText("resize-left-300"));
    expect(screen.getByTestId("left-size").textContent).toBe("300");
  });

  it("clamps resize to min constraint", async () => {
    const user = userEvent.setup();
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    await user.click(screen.getByText("resize-left-100"));
    expect(screen.getByTestId("left-size").textContent).toBe("180");
  });

  it("clamps resize to max constraint", async () => {
    const user = userEvent.setup();
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    await user.click(screen.getByText("resize-left-999"));
    expect(screen.getByTestId("left-size").textContent).toBe("400");
  });

  it("persists state to localStorage", async () => {
    const user = userEvent.setup();
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    await user.click(screen.getByText("toggle-left"));
    const stored = JSON.parse(localStorage.getItem("provisional-canvas-layout") ?? "{}");
    expect(stored.leftPanel.collapsed).toBe(true);
  });

  it("restores state from localStorage", () => {
    localStorage.setItem(
      "provisional-canvas-layout",
      JSON.stringify({
        leftPanel: { collapsed: true, size: 300 },
        inbox: { collapsed: false, size: 280 },
        bottomPanel: { collapsed: true, size: 160 },
      }),
    );
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    expect(screen.getByTestId("left-collapsed").textContent).toBe("true");
    expect(screen.getByTestId("left-size").textContent).toBe("300");
    expect(screen.getByTestId("bottom-collapsed").textContent).toBe("true");
    expect(screen.getByTestId("bottom-size").textContent).toBe("160");
  });

  it("throws when useLayout is used outside LayoutProvider", () => {
    // Suppress React error boundary console output
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<TestConsumer />)).toThrow();
    spy.mockRestore();
  });
});
