import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "@/components/ui/toggle";
import { Bold } from "lucide-react";

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const Pressed: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold" defaultPressed>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold" disabled>
      <Bold className="h-4 w-4" />
    </Toggle>
  ),
};
