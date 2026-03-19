import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ResizeHandle } from "./resize-handle";

describe("ResizeHandle", () => {
  it("renders with vertical orientation", () => {
    render(<ResizeHandle orientation="vertical" onResize={() => {}} />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("renders with horizontal orientation", () => {
    render(<ResizeHandle orientation="horizontal" onResize={() => {}} />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("sets correct cursor class for vertical", () => {
    render(<ResizeHandle orientation="vertical" onResize={() => {}} />);
    expect(screen.getByRole("separator")).toHaveClass("cursor-col-resize");
  });

  it("sets correct cursor class for horizontal", () => {
    render(<ResizeHandle orientation="horizontal" onResize={() => {}} />);
    expect(screen.getByRole("separator")).toHaveClass("cursor-row-resize");
  });

  it("calls onResize with delta during drag", () => {
    const onResize = vi.fn();
    render(<ResizeHandle orientation="vertical" onResize={onResize} />);
    const handle = screen.getByRole("separator");
    fireEvent.pointerDown(handle, { clientX: 100, clientY: 100 });
    fireEvent.pointerMove(document, { clientX: 120, clientY: 100 });
    fireEvent.pointerUp(document);
    expect(onResize).toHaveBeenCalledWith(20);
  });

  it("calls onResizeEnd when drag ends", () => {
    const onResizeEnd = vi.fn();
    render(<ResizeHandle orientation="vertical" onResize={() => {}} onResizeEnd={onResizeEnd} />);
    const handle = screen.getByRole("separator");
    fireEvent.pointerDown(handle, { clientX: 100, clientY: 100 });
    fireEvent.pointerMove(document, { clientX: 120, clientY: 100 });
    fireEvent.pointerUp(document);
    expect(onResizeEnd).toHaveBeenCalledOnce();
  });

  it("uses clientY for horizontal orientation", () => {
    const onResize = vi.fn();
    render(<ResizeHandle orientation="horizontal" onResize={onResize} />);
    const handle = screen.getByRole("separator");
    fireEvent.pointerDown(handle, { clientX: 100, clientY: 200 });
    fireEvent.pointerMove(document, { clientX: 100, clientY: 180 });
    fireEvent.pointerUp(document);
    expect(onResize).toHaveBeenCalledWith(-20);
  });
});
