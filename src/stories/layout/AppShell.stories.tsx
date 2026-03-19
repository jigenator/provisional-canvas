import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppShell } from "@/components/layout/app-shell";

const meta: Meta<typeof AppShell> = {
  title: "Layout/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof AppShell>;

export const Default: Story = {};
