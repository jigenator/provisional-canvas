import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";
import { ZoneHeader } from "@/components/layout/zone-header";
import { IconButton } from "@/components/common/icon-button";

const meta: Meta<typeof ZoneHeader> = {
  title: "Layout/ZoneHeader",
  component: ZoneHeader,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="bg-surface-1 w-80 rounded-md">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ZoneHeader>;

export const Default: Story = { args: { title: "Inbox" } };
export const WithCollapse: Story = { args: { title: "Inbox", onCollapse: () => {} } };
export const WithActions: Story = {
  args: {
    title: "Tools",
    onCollapse: () => {},
    actions: <IconButton icon={Plus} label="Add block" />,
  },
};

export const AllThreeHeaders: Story = {
  render: () => (
    <div className="flex gap-px">
      <div className="bg-surface-1 flex-1">
        <ZoneHeader title="Tools" onCollapse={() => {}} />
      </div>
      <div className="bg-surface-1 flex-1">
        <ZoneHeader title="Inbox" onCollapse={() => {}} />
      </div>
      <div className="bg-surface-1 flex-1">
        <ZoneHeader title="Agent Workspace" />
      </div>
    </div>
  ),
};
