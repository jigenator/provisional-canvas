import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Settings } from "lucide-react";
import { IconButton } from "./icon-button";

describe("IconButton", () => {
  it("renders with accessible label", () => {
    render(<IconButton icon={Settings} label="Settings" />);
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={Settings} label="Settings" onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders the icon", () => {
    render(<IconButton icon={Settings} label="Settings" />);
    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });
});
