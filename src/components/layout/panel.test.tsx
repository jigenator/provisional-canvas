import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { LayoutProvider } from "./layout-provider";
import { Panel } from "./panel";

function renderPanel(id: "left" | "inbox" | "bottom" = "left") {
  return render(
    <LayoutProvider>
      <div style={{ display: "flex", height: 400 }}>
        <Panel
          id={id}
          title="Test Panel"
          defaultSize={240}
          minSize={180}
          maxSize={400}
          resizeDirection="right"
        >
          <p>Panel content</p>
        </Panel>
      </div>
    </LayoutProvider>,
  );
}

describe("Panel", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders children when expanded", () => {
    renderPanel();
    expect(screen.getByText("Panel content")).toBeInTheDocument();
  });

  it("renders the zone header with title", () => {
    renderPanel();
    expect(screen.getByText("Test Panel")).toBeInTheDocument();
  });

  it("shows collapsed strip when collapsed", async () => {
    const user = userEvent.setup();
    renderPanel();
    await user.click(screen.getByRole("button", { name: /collapse/i }));
    expect(screen.getByRole("button", { name: /expand test panel/i })).toBeInTheDocument();
    expect(screen.queryByText("Panel content")).not.toBeInTheDocument();
  });

  it("expands when collapsed strip is clicked", async () => {
    const user = userEvent.setup();
    renderPanel();
    await user.click(screen.getByRole("button", { name: /collapse/i }));
    await user.click(screen.getByRole("button", { name: /expand test panel/i }));
    expect(screen.getByText("Panel content")).toBeInTheDocument();
  });

  it("renders header actions", () => {
    render(
      <LayoutProvider>
        <div style={{ display: "flex", height: 400 }}>
          <Panel
            id="left"
            title="Tools"
            defaultSize={240}
            minSize={180}
            maxSize={400}
            resizeDirection="right"
            headerActions={<button>Add</button>}
          >
            Content
          </Panel>
        </div>
      </LayoutProvider>,
    );
    expect(screen.getByText("Add")).toBeInTheDocument();
  });
});
