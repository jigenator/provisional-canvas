import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResizeHandle } from "@/components/layout/resize-handle";

const meta: Meta<typeof ResizeHandle> = {
  title: "Layout/ResizeHandle",
  component: ResizeHandle,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ResizeHandle>;

function VerticalDemo() {
  const [width, setWidth] = useState(200);
  return (
    <div className="flex h-64">
      <div className="bg-surface-1 flex items-center justify-center text-sm" style={{ width }}>
        {width}px
      </div>
      <ResizeHandle
        orientation="vertical"
        onResize={(delta) => setWidth((w) => Math.max(100, Math.min(400, w + delta)))}
      />
      <div className="bg-background text-fg-secondary flex flex-1 items-center justify-center text-sm">
        Main content
      </div>
    </div>
  );
}

function HorizontalDemo() {
  const [height, setHeight] = useState(150);
  return (
    <div className="flex h-96 flex-col">
      <div className="bg-background text-fg-secondary flex flex-1 items-center justify-center text-sm">
        Main content
      </div>
      <ResizeHandle
        orientation="horizontal"
        onResize={(delta) => setHeight((h) => Math.max(80, Math.min(300, h - delta)))}
      />
      <div className="bg-surface-1 flex items-center justify-center text-sm" style={{ height }}>
        {height}px
      </div>
    </div>
  );
}

export const Vertical: Story = { render: () => <VerticalDemo /> };
export const Horizontal: Story = { render: () => <HorizontalDemo /> };
