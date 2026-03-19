import type { Meta, StoryObj } from "@storybook/react-vite";
import { TopBar } from "@/components/layout/top-bar";

const meta: Meta<typeof TopBar> = {
  title: "Layout/TopBar",
  component: TopBar,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof TopBar>;

export const Default: Story = {};
export const CustomName: Story = { args: { canvasName: "My Creative Space" } };
