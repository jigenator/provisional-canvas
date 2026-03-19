import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchInput } from "@/components/common/search-input";

const meta: Meta<typeof SearchInput> = {
  title: "Common/SearchInput",
  component: SearchInput,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Empty: Story = { args: { value: "", onChange: () => {} } };
export const WithValue: Story = { args: { value: "search term", onChange: () => {} } };
export const CustomPlaceholder: Story = {
  args: { value: "", onChange: () => {}, placeholder: "Filter inbox..." },
};

function InteractiveDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="w-64">
      <SearchInput value={value} onChange={setValue} />
      <p className="text-fg-secondary mt-2 text-xs">Current value: "{value}"</p>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
};
