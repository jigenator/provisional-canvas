import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ZoneHeader } from "./zone-header";

describe("ZoneHeader", () => {
  it("renders the title", () => {
    render(<ZoneHeader title="Inbox" />);
    expect(screen.getByText("Inbox")).toBeInTheDocument();
  });

  it("renders collapse button when onCollapse is provided", () => {
    render(<ZoneHeader title="Inbox" onCollapse={() => {}} />);
    expect(screen.getByRole("button", { name: /collapse/i })).toBeInTheDocument();
  });

  it("does not render collapse button when onCollapse is not provided", () => {
    render(<ZoneHeader title="Inbox" />);
    expect(screen.queryByRole("button", { name: /collapse/i })).not.toBeInTheDocument();
  });

  it("calls onCollapse when collapse button is clicked", async () => {
    const user = userEvent.setup();
    const onCollapse = vi.fn();
    render(<ZoneHeader title="Inbox" onCollapse={onCollapse} />);
    await user.click(screen.getByRole("button", { name: /collapse/i }));
    expect(onCollapse).toHaveBeenCalledOnce();
  });

  it("renders actions slot content", () => {
    render(<ZoneHeader title="Inbox" actions={<button>Add</button>} />);
    expect(screen.getByText("Add")).toBeInTheDocument();
  });
});
