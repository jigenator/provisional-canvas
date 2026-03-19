import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusBadge } from "@/components/common/status-badge";

const meta: Meta<typeof StatusBadge> = {
  title: "Common/StatusBadge",
  component: StatusBadge,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Running: Story = { args: { status: "running" } };
export const Attention: Story = { args: { status: "attention" } };
export const Completed: Story = { args: { status: "completed" } };
export const Error: Story = { args: { status: "error" } };
export const Idle: Story = { args: { status: "idle" } };
export const WithoutDot: Story = { args: { status: "running", showDot: false } };
export const CustomLabel: Story = { args: { status: "running", children: "3 tasks" } };

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
      <StatusBadge status="running" />
      <StatusBadge status="attention" />
      <StatusBadge status="completed" />
      <StatusBadge status="error" />
      <StatusBadge status="idle" />
    </div>
  ),
};
