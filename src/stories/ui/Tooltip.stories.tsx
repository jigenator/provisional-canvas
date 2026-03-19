import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const meta: Meta = {
  title: "UI/Tooltip",
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj;

export const Top: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent side="top">Tooltip on top</TooltipContent>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
    </Tooltip>
  ),
};

export const Left: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent side="left">Tooltip on left</TooltipContent>
    </Tooltip>
  ),
};

export const Right: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent side="right">Tooltip on right</TooltipContent>
    </Tooltip>
  ),
};
