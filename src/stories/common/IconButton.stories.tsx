import type { Meta, StoryObj } from "@storybook/react-vite";
import { Settings, Plus, ChevronLeft, Trash2, Search } from "lucide-react";
import { IconButton } from "@/components/common/icon-button";

const meta: Meta<typeof IconButton> = {
  title: "Common/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const SettingsButton: Story = { args: { icon: Settings, label: "Settings" } };
export const AddButton: Story = { args: { icon: Plus, label: "Add item" } };
export const CollapseButton: Story = { args: { icon: ChevronLeft, label: "Collapse panel" } };

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-2)" }}>
      <IconButton icon={Settings} label="Settings" />
      <IconButton icon={Plus} label="Add" />
      <IconButton icon={ChevronLeft} label="Collapse" />
      <IconButton icon={Search} label="Search" />
      <IconButton icon={Trash2} label="Delete" />
    </div>
  ),
};
