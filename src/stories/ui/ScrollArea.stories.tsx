import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "@/components/ui/scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-md border p-4">
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className="py-1 text-sm">
          Item {i + 1}
        </div>
      ))}
    </ScrollArea>
  ),
};
