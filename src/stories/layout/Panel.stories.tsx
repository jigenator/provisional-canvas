import type { Meta, StoryObj } from "@storybook/react-vite";
import { LayoutProvider } from "@/components/layout/layout-provider";
import { Panel } from "@/components/layout/panel";
import { Plus } from "lucide-react";
import { IconButton } from "@/components/common/icon-button";

const meta: Meta<typeof Panel> = {
  title: "Layout/Panel",
  component: Panel,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <LayoutProvider>
        <div className="flex h-96">
          <Story />
          <div className="bg-background text-fg-secondary flex flex-1 items-center justify-center text-sm">
            Workspace area
          </div>
        </div>
      </LayoutProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Panel>;

export const LeftPanel: Story = {
  args: {
    id: "left",
    title: "Tools",
    defaultSize: 240,
    minSize: 180,
    maxSize: 400,
    resizeDirection: "right",
    children: (
      <div className="space-y-2 text-sm">
        <p>Tool block 1</p>
        <p>Tool block 2</p>
        <p>Tool block 3</p>
      </div>
    ),
  },
};

export const InboxPanel: Story = {
  args: {
    id: "inbox",
    title: "Inbox",
    defaultSize: 280,
    minSize: 220,
    maxSize: 448,
    resizeDirection: "right",
    headerActions: <IconButton icon={Plus} label="New chat" />,
    children: (
      <div className="space-y-2 text-sm">
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className="bg-surface-2 rounded-md p-2">
            Inbox item {i + 1}
          </div>
        ))}
      </div>
    ),
  },
};

export const BottomPanel: Story = {
  decorators: [
    (Story) => (
      <LayoutProvider>
        <div className="flex h-96 flex-col">
          <div className="bg-background text-fg-secondary flex flex-1 items-center justify-center text-sm">
            Workspace area
          </div>
          <Story />
        </div>
      </LayoutProvider>
    ),
  ],
  args: {
    id: "bottom",
    title: "Terminal",
    defaultSize: 200,
    minSize: 120,
    maxSize: 400,
    resizeDirection: "top",
    children: (
      <div className="font-mono text-sm">
        <p className="text-fg-secondary">$ npm run dev</p>
        <p className="text-status-completed">Server running on port 5173</p>
      </div>
    ),
  },
};
