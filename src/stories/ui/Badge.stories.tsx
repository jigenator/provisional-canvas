import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: "Badge" } };
export const Secondary: Story = { args: { children: "Secondary", variant: "secondary" } };
export const Destructive: Story = { args: { children: "Destructive", variant: "destructive" } };
export const Outline: Story = { args: { children: "Outline", variant: "outline" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-3)" }}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
