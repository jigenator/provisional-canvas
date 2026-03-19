import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@/components/ui/separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <div className="py-2 text-sm">Above</div>
      <Separator />
      <div className="py-2 text-sm">Below</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Right</span>
    </div>
  ),
};
