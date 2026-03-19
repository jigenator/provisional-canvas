import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeToggle } from "@/components/common/theme-toggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "Common/ThemeToggle",
  component: ThemeToggle,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};
