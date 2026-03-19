import type { Meta, StoryObj } from "@storybook/react-vite";
import { CollapsedStrip } from "@/components/layout/collapsed-strip";

const meta: Meta<typeof CollapsedStrip> = {
  title: "Layout/CollapsedStrip",
  component: CollapsedStrip,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof CollapsedStrip>;

export const VerticalInbox: Story = {
  render: () => (
    <div className="bg-background flex h-96">
      <CollapsedStrip label="Inbox" orientation="vertical" onExpand={() => {}} />
      <div className="text-fg-secondary flex flex-1 items-center justify-center text-sm">
        Workspace area
      </div>
    </div>
  ),
};

export const VerticalTools: Story = {
  render: () => (
    <div className="bg-background flex h-96">
      <CollapsedStrip label="Tools" orientation="vertical" onExpand={() => {}} />
      <div className="text-fg-secondary flex flex-1 items-center justify-center text-sm">
        Workspace area
      </div>
    </div>
  ),
};

export const HorizontalTerminal: Story = {
  render: () => (
    <div className="bg-background flex w-96 flex-col">
      <div className="text-fg-secondary flex flex-1 items-center justify-center text-sm">
        Workspace area
      </div>
      <CollapsedStrip label="Terminal" orientation="horizontal" onExpand={() => {}} />
    </div>
  ),
};
