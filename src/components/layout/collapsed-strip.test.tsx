import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CollapsedStrip } from "./collapsed-strip";

describe("CollapsedStrip", () => {
  it("renders the label", () => {
    render(<CollapsedStrip label="Inbox" orientation="vertical" onExpand={() => {}} />);
    expect(screen.getByText("Inbox")).toBeInTheDocument();
  });

  it("calls onExpand when clicked", async () => {
    const user = userEvent.setup();
    const onExpand = vi.fn();
    render(<CollapsedStrip label="Inbox" orientation="vertical" onExpand={onExpand} />);
    await user.click(screen.getByRole("button"));
    expect(onExpand).toHaveBeenCalledOnce();
  });

  it("renders expand button with accessible label", () => {
    render(<CollapsedStrip label="Inbox" orientation="vertical" onExpand={() => {}} />);
    expect(screen.getByRole("button", { name: /expand inbox/i })).toBeInTheDocument();
  });

  it("applies vertical styling for vertical orientation", () => {
    render(<CollapsedStrip label="Inbox" orientation="vertical" onExpand={() => {}} />);
    expect(screen.getByRole("button")).toHaveClass("w-8");
  });

  it("applies horizontal styling for horizontal orientation", () => {
    render(<CollapsedStrip label="Terminal" orientation="horizontal" onExpand={() => {}} />);
    expect(screen.getByRole("button")).toHaveClass("h-8");
  });
});
