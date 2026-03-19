# Components & Layout Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install shadcn primitives, build wrapper and layout components with Storybook stories, and compose into the four-zone desktop layout shell.

**Architecture:** Three-layer component architecture (shadcn primitives → wrapper components → layout components). All panel state managed via shared LayoutContext. Components built bottom-up, each with tests and stories, culminating in the AppShell composition.

**Tech Stack:** React 19, TypeScript 5.9, Tailwind CSS v4, shadcn/ui v4 (new-york style), Vitest + Testing Library, Storybook 10, lucide-react icons.

**Key references:**

- Design spec: `docs/superpowers/specs/2026-03-19-components-and-layout-design.md`
- Design tokens: `src/styles/globals.css`
- shadcn config: `components.json` (new-york style, `@/components/ui`, lucide icons)
- Test setup: `src/test/setup.ts` (jest-dom matchers via `@testing-library/jest-dom/vitest`)
- Storybook preview: `.storybook/preview.ts` (dark mode via `withThemeByClassName`)
- Path alias: `@/*` → `src/*`
- Test command: `npx vitest run --project=unit` (jsdom environment)
- Individual test: `npx vitest run src/path/file.test.tsx --project=unit`

**Conventions:**

- All component files use kebab-case filenames
- All test files colocated as `component-name.test.tsx` next to the component
- Stories in `src/stories/` mirroring the component directory structure
- shadcn components in `src/components/ui/` are never modified
- Wrapper components in `src/components/common/`
- Layout components in `src/components/layout/`
- Use `cn()` from `@/lib/utils` for conditional class merging
- Use design token Tailwind classes (e.g., `bg-surface-1`, `text-fg-secondary`)
- All sizing values use 4px multiples

---

### Task 1: Install shadcn Primitives

**Files:**

- Create: `src/components/ui/button.tsx` (via shadcn CLI)
- Create: `src/components/ui/badge.tsx` (via shadcn CLI)
- Create: `src/components/ui/input.tsx` (via shadcn CLI)
- Create: `src/components/ui/scroll-area.tsx` (via shadcn CLI)
- Create: `src/components/ui/separator.tsx` (via shadcn CLI)
- Create: `src/components/ui/toggle.tsx` (via shadcn CLI)
- Create: `src/components/ui/tooltip.tsx` (via shadcn CLI)

- [ ] **Step 1: Install all shadcn components**

```bash
npx shadcn@latest add button badge input scroll-area separator toggle tooltip
```

This installs each component into `src/components/ui/` and adds required dependencies (radix-ui packages, lucide-react) to `package.json`.

- [ ] **Step 2: Verify installation**

```bash
ls src/components/ui/
```

Expected: `badge.tsx`, `button.tsx`, `input.tsx`, `scroll-area.tsx`, `separator.tsx`, `toggle.tsx`, `tooltip.tsx`

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: Clean build with no type errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ package.json package-lock.json
git commit -m "feat: install shadcn primitives (badge, input, scroll-area, separator, toggle, tooltip)"
```

---

### Task 2: Storybook Stories for shadcn Primitives

**Files:**

- Create: `src/stories/ui/Badge.stories.tsx`
- Create: `src/stories/ui/Input.stories.tsx`
- Create: `src/stories/ui/ScrollArea.stories.tsx`
- Create: `src/stories/ui/Separator.stories.tsx`
- Create: `src/stories/ui/Toggle.stories.tsx`
- Create: `src/stories/ui/Tooltip.stories.tsx`

These stories are variant showcases — no tests needed for shadcn internals.

- [ ] **Step 1: Create Badge stories**

Create `src/stories/ui/Badge.stories.tsx`:

```tsx
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
```

- [ ] **Step 2: Create Input stories**

Create `src/stories/ui/Input.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@/components/ui/input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: "Type something..." } };
export const Disabled: Story = { args: { placeholder: "Disabled", disabled: true } };
export const WithValue: Story = { args: { defaultValue: "Hello world" } };
```

- [ ] **Step 3: Create ScrollArea stories**

Create `src/stories/ui/ScrollArea.stories.tsx`:

```tsx
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
```

- [ ] **Step 4: Create Separator stories**

Create `src/stories/ui/Separator.stories.tsx`:

```tsx
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
```

- [ ] **Step 5: Create Toggle stories**

Create `src/stories/ui/Toggle.stories.tsx`:

```tsx
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
```

- [ ] **Step 6: Create Tooltip stories**

Create `src/stories/ui/Tooltip.stories.tsx`:

```tsx
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
```

- [ ] **Step 7: Verify stories render in Storybook**

Storybook should already be running on port 6006. Check that all six story files appear under "UI/" in the sidebar.

- [ ] **Step 8: Commit**

```bash
git add src/stories/ui/
git commit -m "feat: add Storybook stories for shadcn primitives"
```

---

### Task 3: StatusBadge Component

**Files:**

- Create: `src/components/common/status-badge.tsx`
- Test: `src/components/common/status-badge.test.tsx`
- Create: `src/stories/common/StatusBadge.stories.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/common/status-badge.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusBadge } from "./status-badge";

describe("StatusBadge", () => {
  it("renders the default label for each status", () => {
    const statuses = [
      { status: "running" as const, label: "Running" },
      { status: "attention" as const, label: "Needs Attention" },
      { status: "completed" as const, label: "Completed" },
      { status: "error" as const, label: "Error" },
      { status: "idle" as const, label: "Idle" },
    ];

    for (const { status, label } of statuses) {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(screen.getByText(label)).toBeInTheDocument();
      unmount();
    }
  });

  it("renders custom children as label override", () => {
    render(<StatusBadge status="running">Custom Label</StatusBadge>);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("renders a dot indicator by default", () => {
    render(<StatusBadge status="running" />);
    expect(screen.getByTestId("status-dot")).toBeInTheDocument();
  });

  it("hides the dot indicator when showDot is false", () => {
    render(<StatusBadge status="running" showDot={false} />);
    expect(screen.queryByTestId("status-dot")).not.toBeInTheDocument();
  });

  it("applies pulse animation for running status dot", () => {
    render(<StatusBadge status="running" />);
    const dot = screen.getByTestId("status-dot");
    expect(dot).toHaveClass("animate-pulse");
  });

  it("does not apply pulse animation for non-running status dot", () => {
    render(<StatusBadge status="completed" />);
    const dot = screen.getByTestId("status-dot");
    expect(dot).not.toHaveClass("animate-pulse");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/common/status-badge.test.tsx --project=unit
```

Expected: FAIL — module `./status-badge` not found.

- [ ] **Step 3: Implement StatusBadge**

Create `src/components/common/status-badge.tsx`:

```tsx
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "running" | "attention" | "completed" | "error" | "idle";

interface StatusBadgeProps {
  status: Status;
  showDot?: boolean;
  children?: ReactNode;
}

const statusConfig: Record<Status, { label: string; classes: string }> = {
  running: {
    label: "Running",
    classes: "bg-status-running/15 text-status-running border-transparent",
  },
  attention: {
    label: "Needs Attention",
    classes: "bg-status-attention/15 text-status-attention border-transparent",
  },
  completed: {
    label: "Completed",
    classes: "bg-status-completed/15 text-status-completed border-transparent",
  },
  error: {
    label: "Error",
    classes: "bg-status-error/15 text-status-error border-transparent",
  },
  idle: {
    label: "Idle",
    classes: "bg-status-idle/15 text-status-idle border-transparent",
  },
};

function StatusBadge({ status, showDot = true, children }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={cn("gap-1.5", config.classes)}>
      {showDot && (
        <span
          data-testid="status-dot"
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full bg-current",
            status === "running" && "animate-pulse",
          )}
        />
      )}
      {children ?? config.label}
    </Badge>
  );
}

export { StatusBadge };
export type { StatusBadgeProps, Status };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/common/status-badge.test.tsx --project=unit
```

Expected: All 6 tests PASS.

- [ ] **Step 5: Create StatusBadge story**

Create `src/stories/common/StatusBadge.stories.tsx`:

```tsx
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
```

- [ ] **Step 6: Verify story renders in Storybook**

Check Storybook at port 6006 — "Common/StatusBadge" should appear with all variants. Verify colors match design tokens in both light and dark mode.

- [ ] **Step 7: Commit**

```bash
git add src/components/common/status-badge.tsx src/components/common/status-badge.test.tsx src/stories/common/StatusBadge.stories.tsx
git commit -m "feat: add StatusBadge component with status variants"
```

---

### Task 4: ThemeToggle Component

**Files:**

- Create: `src/components/common/theme-toggle.tsx`
- Test: `src/components/common/theme-toggle.test.tsx`
- Create: `src/stories/common/ThemeToggle.stories.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/common/theme-toggle.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("renders a toggle button with accessible label", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("adds dark class to document when toggled", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByRole("button"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes dark class when toggled again", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole("button");
    await user.click(button);
    await user.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persists theme to localStorage", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByRole("button"));
    expect(localStorage.getItem("provisional-canvas-theme")).toBe("dark");
  });

  it("reads initial theme from localStorage", () => {
    localStorage.setItem("provisional-canvas-theme", "dark");
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/common/theme-toggle.test.tsx --project=unit
```

Expected: FAIL — module `./theme-toggle` not found.

- [ ] **Step 3: Implement ThemeToggle**

Create `src/components/common/theme-toggle.tsx`:

```tsx
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "provisional-canvas-theme";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
    >
      {theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

export { ThemeToggle };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/common/theme-toggle.test.tsx --project=unit
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Create ThemeToggle story**

Create `src/stories/common/ThemeToggle.stories.tsx`:

```tsx
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
```

Note: In Storybook, the theme is controlled by the addon-themes decorator. The ThemeToggle will work independently — clicking it toggles `.dark` on the document root. The Storybook theme toggle in the toolbar controls the story preview theme.

- [ ] **Step 6: Commit**

```bash
git add src/components/common/theme-toggle.tsx src/components/common/theme-toggle.test.tsx src/stories/common/ThemeToggle.stories.tsx
git commit -m "feat: add ThemeToggle component with localStorage persistence"
```

---

### Task 5: SearchInput Component

**Files:**

- Create: `src/components/common/search-input.tsx`
- Test: `src/components/common/search-input.test.tsx`
- Create: `src/stories/common/SearchInput.stories.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/common/search-input.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SearchInput } from "./search-input";

describe("SearchInput", () => {
  it("renders with placeholder", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(<SearchInput value="" onChange={() => {}} placeholder="Filter items..." />);
    expect(screen.getByPlaceholderText("Filter items...")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchInput value="" onChange={onChange} />);
    await user.type(screen.getByRole("searchbox"), "hello");
    expect(onChange).toHaveBeenCalledWith("h");
  });

  it("shows clear button when value is non-empty", () => {
    render(<SearchInput value="test" onChange={() => {}} />);
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("hides clear button when value is empty", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.queryByRole("button", { name: /clear/i })).not.toBeInTheDocument();
  });

  it("calls onChange with empty string when clear is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchInput value="test" onChange={onChange} />);
    await user.click(screen.getByRole("button", { name: /clear/i }));
    expect(onChange).toHaveBeenCalledWith("");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/common/search-input.test.tsx --project=unit
```

Expected: FAIL — module `./search-input` not found.

- [ ] **Step 3: Implement SearchInput**

Create `src/components/common/search-input.tsx`:

```tsx
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchInput({ value, onChange, placeholder = "Search..." }: SearchInputProps) {
  return (
    <div className="relative flex items-center">
      <Search className="text-fg-muted pointer-events-none absolute left-2 h-3.5 w-3.5" />
      <Input
        type="search"
        role="searchbox"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 pr-7 pl-7 text-sm"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Clear search"
          onClick={() => onChange("")}
          className="absolute right-0.5 h-6 w-6"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}

export { SearchInput };
export type { SearchInputProps };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/common/search-input.test.tsx --project=unit
```

Expected: All 6 tests PASS.

- [ ] **Step 5: Create SearchInput story**

Create `src/stories/common/SearchInput.stories.tsx`:

```tsx
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

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="w-64">
        <SearchInput value={value} onChange={setValue} />
        <p className="text-fg-secondary mt-2 text-xs">Current value: "{value}"</p>
      </div>
    );
  },
};
```

- [ ] **Step 6: Commit**

```bash
git add src/components/common/search-input.tsx src/components/common/search-input.test.tsx src/stories/common/SearchInput.stories.tsx
git commit -m "feat: add SearchInput component with clear button"
```

---

### Task 6: IconButton Component

**Files:**

- Create: `src/components/common/icon-button.tsx`
- Test: `src/components/common/icon-button.test.tsx`
- Create: `src/stories/common/IconButton.stories.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/common/icon-button.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Settings } from "lucide-react";
import { IconButton } from "./icon-button";

describe("IconButton", () => {
  it("renders with accessible label", () => {
    render(<IconButton icon={Settings} label="Settings" />);
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={Settings} label="Settings" onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders the icon", () => {
    render(<IconButton icon={Settings} label="Settings" />);
    const button = screen.getByRole("button");
    expect(button.querySelector("svg")).toBeInTheDocument();
  });
});
```

Note: Tooltip behavior is difficult to test in jsdom (requires hover + delay). We verify tooltip rendering visually in Storybook instead. Tests focus on the button behavior (accessible label, click handler, icon rendering).

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/common/icon-button.test.tsx --project=unit
```

Expected: FAIL — module `./icon-button` not found.

- [ ] **Step 3: Implement IconButton**

Create `src/components/common/icon-button.tsx`:

```tsx
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  tooltipSide?: "top" | "bottom" | "left" | "right";
}

function IconButton({ icon: Icon, label, onClick, tooltipSide = "bottom" }: IconButtonProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={label} onClick={onClick}>
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={tooltipSide}>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export { IconButton };
export type { IconButtonProps };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/common/icon-button.test.tsx --project=unit
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Create IconButton story**

Create `src/stories/common/IconButton.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Settings, Plus, ChevronLeft, Trash2, Search } from "lucide-react";
import { IconButton } from "@/components/common/icon-button";

const meta: Meta<typeof IconButton> = {
  title: "Common/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const SettingsButton: Story = { args: { icon: Settings, label: "Settings" } };
export const AddButton: Story = { args: { icon: Plus, label: "Add item" } };
export const CollapseButton: Story = { args: { icon: ChevronLeft, label: "Collapse panel" } };

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-2)" }}>
      <IconButton icon={Settings} label="Settings" />
      <IconButton icon={Plus} label="Add" />
      <IconButton icon={ChevronLeft} label="Collapse" />
      <IconButton icon={Search} label="Search" />
      <IconButton icon={Trash2} label="Delete" />
    </div>
  ),
};
```

- [ ] **Step 6: Commit**

```bash
git add src/components/common/icon-button.tsx src/components/common/icon-button.test.tsx src/stories/common/IconButton.stories.tsx
git commit -m "feat: add IconButton component with tooltip"
```

---

### Task 7: LayoutProvider

**Files:**

- Create: `src/components/layout/layout-provider.tsx`
- Test: `src/components/layout/layout-provider.test.tsx`

No Storybook story — this is a context provider, not a visual component.

- [ ] **Step 1: Write the failing tests**

Create `src/components/layout/layout-provider.test.tsx`:

```tsx
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { LayoutProvider, useLayout } from "./layout-provider";

function TestConsumer() {
  const layout = useLayout();
  return (
    <div>
      <span data-testid="left-collapsed">{String(layout.leftPanel.collapsed)}</span>
      <span data-testid="left-size">{layout.leftPanel.size}</span>
      <span data-testid="inbox-collapsed">{String(layout.inbox.collapsed)}</span>
      <span data-testid="inbox-size">{layout.inbox.size}</span>
      <span data-testid="bottom-collapsed">{String(layout.bottomPanel.collapsed)}</span>
      <span data-testid="bottom-size">{layout.bottomPanel.size}</span>
      <button onClick={() => layout.togglePanel("left")}>toggle-left</button>
      <button onClick={() => layout.togglePanel("inbox")}>toggle-inbox</button>
      <button onClick={() => layout.togglePanel("bottom")}>toggle-bottom</button>
      <button onClick={() => layout.resizePanel("left", 300)}>resize-left-300</button>
      <button onClick={() => layout.resizePanel("left", 100)}>resize-left-100</button>
      <button onClick={() => layout.resizePanel("left", 999)}>resize-left-999</button>
    </div>
  );
}

describe("LayoutProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("provides default panel sizes", () => {
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    expect(screen.getByTestId("left-size").textContent).toBe("240");
    expect(screen.getByTestId("inbox-size").textContent).toBe("280");
    expect(screen.getByTestId("bottom-size").textContent).toBe("200");
  });

  it("provides default collapsed states as false", () => {
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    expect(screen.getByTestId("left-collapsed").textContent).toBe("false");
    expect(screen.getByTestId("inbox-collapsed").textContent).toBe("false");
    expect(screen.getByTestId("bottom-collapsed").textContent).toBe("false");
  });

  it("toggles panel collapsed state", async () => {
    const user = userEvent.setup();
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    await user.click(screen.getByText("toggle-left"));
    expect(screen.getByTestId("left-collapsed").textContent).toBe("true");
    await user.click(screen.getByText("toggle-left"));
    expect(screen.getByTestId("left-collapsed").textContent).toBe("false");
  });

  it("resizes panel within constraints", async () => {
    const user = userEvent.setup();
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    await user.click(screen.getByText("resize-left-300"));
    expect(screen.getByTestId("left-size").textContent).toBe("300");
  });

  it("clamps resize to min constraint", async () => {
    const user = userEvent.setup();
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    await user.click(screen.getByText("resize-left-100"));
    expect(screen.getByTestId("left-size").textContent).toBe("180");
  });

  it("clamps resize to max constraint", async () => {
    const user = userEvent.setup();
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    await user.click(screen.getByText("resize-left-999"));
    expect(screen.getByTestId("left-size").textContent).toBe("400");
  });

  it("persists state to localStorage", async () => {
    const user = userEvent.setup();
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    await user.click(screen.getByText("toggle-left"));
    const stored = JSON.parse(localStorage.getItem("provisional-canvas-layout") ?? "{}");
    expect(stored.leftPanel.collapsed).toBe(true);
  });

  it("restores state from localStorage", () => {
    localStorage.setItem(
      "provisional-canvas-layout",
      JSON.stringify({
        leftPanel: { collapsed: true, size: 300 },
        inbox: { collapsed: false, size: 280 },
        bottomPanel: { collapsed: true, size: 160 },
      }),
    );
    render(
      <LayoutProvider>
        <TestConsumer />
      </LayoutProvider>,
    );
    expect(screen.getByTestId("left-collapsed").textContent).toBe("true");
    expect(screen.getByTestId("left-size").textContent).toBe("300");
    expect(screen.getByTestId("bottom-collapsed").textContent).toBe("true");
    expect(screen.getByTestId("bottom-size").textContent).toBe("160");
  });

  it("throws when useLayout is used outside LayoutProvider", () => {
    expect(() => render(<TestConsumer />)).toThrow();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/layout/layout-provider.test.tsx --project=unit
```

Expected: FAIL — module `./layout-provider` not found.

- [ ] **Step 3: Implement LayoutProvider**

Create `src/components/layout/layout-provider.tsx`:

```tsx
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface PanelState {
  collapsed: boolean;
  size: number;
}

type PanelId = "left" | "inbox" | "bottom";

interface LayoutContextValue {
  leftPanel: PanelState;
  inbox: PanelState;
  bottomPanel: PanelState;
  togglePanel: (panel: PanelId) => void;
  resizePanel: (panel: PanelId, size: number) => void;
}

const STORAGE_KEY = "provisional-canvas-layout";

const PANEL_CONSTRAINTS: Record<PanelId, { default: number; min: number; max: number }> = {
  left: { default: 240, min: 180, max: 400 },
  inbox: { default: 280, min: 220, max: 448 },
  bottom: { default: 200, min: 120, max: 400 },
};

const PANEL_STATE_KEYS: Record<
  PanelId,
  keyof Pick<LayoutState, "leftPanel" | "inbox" | "bottomPanel">
> = {
  left: "leftPanel",
  inbox: "inbox",
  bottom: "bottomPanel",
};

interface LayoutState {
  leftPanel: PanelState;
  inbox: PanelState;
  bottomPanel: PanelState;
}

function getDefaultState(): LayoutState {
  return {
    leftPanel: { collapsed: false, size: PANEL_CONSTRAINTS.left.default },
    inbox: { collapsed: false, size: PANEL_CONSTRAINTS.inbox.default },
    bottomPanel: { collapsed: false, size: PANEL_CONSTRAINTS.bottom.default },
  };
}

function loadState(): LayoutState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as LayoutState;
      return {
        leftPanel: { ...getDefaultState().leftPanel, ...parsed.leftPanel },
        inbox: { ...getDefaultState().inbox, ...parsed.inbox },
        bottomPanel: { ...getDefaultState().bottomPanel, ...parsed.bottomPanel },
      };
    }
  } catch {
    // Ignore invalid stored data
  }
  return getDefaultState();
}

const LayoutContext = createContext<LayoutContextValue | null>(null);

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LayoutState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const togglePanel = useCallback((panel: PanelId) => {
    const key = PANEL_STATE_KEYS[panel];
    setState((prev) => ({
      ...prev,
      [key]: { ...prev[key], collapsed: !prev[key].collapsed },
    }));
  }, []);

  const resizePanel = useCallback((panel: PanelId, size: number) => {
    const key = PANEL_STATE_KEYS[panel];
    const constraints = PANEL_CONSTRAINTS[panel];
    const clamped = Math.max(constraints.min, Math.min(constraints.max, size));
    setState((prev) => ({
      ...prev,
      [key]: { ...prev[key], size: clamped },
    }));
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        leftPanel: state.leftPanel,
        inbox: state.inbox,
        bottomPanel: state.bottomPanel,
        togglePanel,
        resizePanel,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

function useLayout(): LayoutContextValue {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}

export { LayoutProvider, useLayout, PANEL_CONSTRAINTS };
export type { PanelState, PanelId, LayoutContextValue };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/layout/layout-provider.test.tsx --project=unit
```

Expected: All 9 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/layout-provider.tsx src/components/layout/layout-provider.test.tsx
git commit -m "feat: add LayoutProvider with panel state management and localStorage persistence"
```

---

### Task 8: ZoneHeader Component

**Files:**

- Create: `src/components/layout/zone-header.tsx`
- Test: `src/components/layout/zone-header.test.tsx`
- Create: `src/stories/layout/ZoneHeader.stories.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/layout/zone-header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ZoneHeader } from "./zone-header";

describe("ZoneHeader", () => {
  it("renders the title", () => {
    render(<ZoneHeader title="Inbox" />);
    expect(screen.getByText("Inbox")).toBeInTheDocument();
  });

  it("renders collapse button when onCollapse is provided", () => {
    render(<ZoneHeader title="Inbox" onCollapse={() => {}} />);
    expect(screen.getByRole("button", { name: /collapse/i })).toBeInTheDocument();
  });

  it("does not render collapse button when onCollapse is not provided", () => {
    render(<ZoneHeader title="Inbox" />);
    expect(screen.queryByRole("button", { name: /collapse/i })).not.toBeInTheDocument();
  });

  it("calls onCollapse when collapse button is clicked", async () => {
    const user = userEvent.setup();
    const onCollapse = vi.fn();
    render(<ZoneHeader title="Inbox" onCollapse={onCollapse} />);
    await user.click(screen.getByRole("button", { name: /collapse/i }));
    expect(onCollapse).toHaveBeenCalledOnce();
  });

  it("renders actions slot content", () => {
    render(<ZoneHeader title="Inbox" actions={<button>Add</button>} />);
    expect(screen.getByText("Add")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/layout/zone-header.test.tsx --project=unit
```

Expected: FAIL — module `./zone-header` not found.

- [ ] **Step 3: Implement ZoneHeader**

Create `src/components/layout/zone-header.tsx`:

```tsx
import type { ReactNode } from "react";
import { ChevronsLeft } from "lucide-react";
import { IconButton } from "@/components/common/icon-button";

interface ZoneHeaderProps {
  title: string;
  onCollapse?: () => void;
  actions?: ReactNode;
}

function ZoneHeader({ title, onCollapse, actions }: ZoneHeaderProps) {
  return (
    <div className="border-border flex h-9 shrink-0 items-center justify-between border-b px-3">
      <span className="font-ui text-foreground truncate text-[length:var(--text-heading-3)] font-medium">
        {title}
      </span>
      <div className="flex items-center gap-0.5">
        {actions}
        {onCollapse && (
          <IconButton
            icon={ChevronsLeft}
            label="Collapse panel"
            onClick={onCollapse}
            tooltipSide="bottom"
          />
        )}
      </div>
    </div>
  );
}

export { ZoneHeader };
export type { ZoneHeaderProps };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/layout/zone-header.test.tsx --project=unit
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Create ZoneHeader story**

Create `src/stories/layout/ZoneHeader.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";
import { ZoneHeader } from "@/components/layout/zone-header";
import { IconButton } from "@/components/common/icon-button";

const meta: Meta<typeof ZoneHeader> = {
  title: "Layout/ZoneHeader",
  component: ZoneHeader,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="bg-surface-1 w-80 rounded-md">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof ZoneHeader>;

export const Default: Story = { args: { title: "Inbox" } };
export const WithCollapse: Story = { args: { title: "Inbox", onCollapse: () => {} } };
export const WithActions: Story = {
  args: {
    title: "Tools",
    onCollapse: () => {},
    actions: <IconButton icon={Plus} label="Add block" />,
  },
};

export const AllThreeHeaders: Story = {
  render: () => (
    <div className="flex gap-px">
      <div className="bg-surface-1 flex-1">
        <ZoneHeader title="Tools" onCollapse={() => {}} />
      </div>
      <div className="bg-surface-1 flex-1">
        <ZoneHeader title="Inbox" onCollapse={() => {}} />
      </div>
      <div className="bg-surface-1 flex-1">
        <ZoneHeader title="Agent Workspace" />
      </div>
    </div>
  ),
};
```

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/zone-header.tsx src/components/layout/zone-header.test.tsx src/stories/layout/ZoneHeader.stories.tsx
git commit -m "feat: add ZoneHeader component with collapse control and actions slot"
```

---

### Task 9: CollapsedStrip Component

**Files:**

- Create: `src/components/layout/collapsed-strip.tsx`
- Test: `src/components/layout/collapsed-strip.test.tsx`
- Create: `src/stories/layout/CollapsedStrip.stories.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/layout/collapsed-strip.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CollapsedStrip } from "./collapsed-strip";

describe("CollapsedStrip", () => {
  it("renders the label", () => {
    render(<CollapsedStrip label="Inbox" orientation="vertical" onExpand={() => {}} />);
    expect(screen.getByText("Inbox")).toBeInTheDocument();
  });

  it("calls onExpand when clicked", async () => {
    const user = userEvent.setup();
    const onExpand = vi.fn();
    render(<CollapsedStrip label="Inbox" orientation="vertical" onExpand={onExpand} />);
    await user.click(screen.getByRole("button"));
    expect(onExpand).toHaveBeenCalledOnce();
  });

  it("renders expand button with accessible label", () => {
    render(<CollapsedStrip label="Inbox" orientation="vertical" onExpand={() => {}} />);
    expect(screen.getByRole("button", { name: /expand inbox/i })).toBeInTheDocument();
  });

  it("applies vertical styling for vertical orientation", () => {
    render(<CollapsedStrip label="Inbox" orientation="vertical" onExpand={() => {}} />);
    const strip = screen.getByRole("button");
    expect(strip).toHaveClass("w-8");
  });

  it("applies horizontal styling for horizontal orientation", () => {
    render(<CollapsedStrip label="Terminal" orientation="horizontal" onExpand={() => {}} />);
    const strip = screen.getByRole("button");
    expect(strip).toHaveClass("h-8");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/layout/collapsed-strip.test.tsx --project=unit
```

Expected: FAIL — module `./collapsed-strip` not found.

- [ ] **Step 3: Implement CollapsedStrip**

Create `src/components/layout/collapsed-strip.tsx`:

```tsx
import { ChevronRight, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsedStripProps {
  label: string;
  orientation: "vertical" | "horizontal";
  onExpand: () => void;
}

function CollapsedStrip({ label, orientation, onExpand }: CollapsedStripProps) {
  const isVertical = orientation === "vertical";

  return (
    <button
      onClick={onExpand}
      aria-label={`Expand ${label}`}
      className={cn(
        "bg-surface-1 border-border text-fg-secondary hover:bg-surface-2 flex shrink-0 cursor-pointer items-center transition-colors",
        "duration-[--duration-snappy]",
        isVertical ? "w-8 flex-col gap-2 border-r py-3" : "h-8 flex-row gap-2 border-t px-3",
      )}
    >
      {isVertical ? (
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
      ) : (
        <ChevronUp className="h-3.5 w-3.5 shrink-0" />
      )}
      <span
        className={cn(
          "font-ui text-[length:var(--text-caption)] whitespace-nowrap",
          isVertical && "rotate-180 [writing-mode:vertical-lr]",
        )}
      >
        {label}
      </span>
    </button>
  );
}

export { CollapsedStrip };
export type { CollapsedStripProps };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/layout/collapsed-strip.test.tsx --project=unit
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Create CollapsedStrip story**

Create `src/stories/layout/CollapsedStrip.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CollapsedStrip } from "@/components/layout/collapsed-strip";

const meta: Meta<typeof CollapsedStrip> = {
  title: "Layout/CollapsedStrip",
  component: CollapsedStrip,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof CollapsedStrip>;

export const VerticalInbox: Story = {
  render: () => (
    <div className="bg-background flex h-96">
      <CollapsedStrip label="Inbox" orientation="vertical" onExpand={() => {}} />
      <div className="text-fg-secondary flex flex-1 items-center justify-center text-sm">
        Workspace area
      </div>
    </div>
  ),
};

export const VerticalTools: Story = {
  render: () => (
    <div className="bg-background flex h-96">
      <CollapsedStrip label="Tools" orientation="vertical" onExpand={() => {}} />
      <div className="text-fg-secondary flex flex-1 items-center justify-center text-sm">
        Workspace area
      </div>
    </div>
  ),
};

export const HorizontalTerminal: Story = {
  render: () => (
    <div className="bg-background flex w-96 flex-col">
      <div className="text-fg-secondary flex flex-1 items-center justify-center text-sm">
        Workspace area
      </div>
      <CollapsedStrip label="Terminal" orientation="horizontal" onExpand={() => {}} />
    </div>
  ),
};
```

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/collapsed-strip.tsx src/components/layout/collapsed-strip.test.tsx src/stories/layout/CollapsedStrip.stories.tsx
git commit -m "feat: add CollapsedStrip component with vertical/horizontal orientation"
```

---

### Task 10: ResizeHandle Component

**Files:**

- Create: `src/components/layout/resize-handle.tsx`
- Test: `src/components/layout/resize-handle.test.tsx`
- Create: `src/stories/layout/ResizeHandle.stories.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/layout/resize-handle.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ResizeHandle } from "./resize-handle";

describe("ResizeHandle", () => {
  it("renders with vertical orientation", () => {
    render(<ResizeHandle orientation="vertical" onResize={() => {}} />);
    const handle = screen.getByRole("separator");
    expect(handle).toHaveAttribute("aria-orientation", "vertical");
  });

  it("renders with horizontal orientation", () => {
    render(<ResizeHandle orientation="horizontal" onResize={() => {}} />);
    const handle = screen.getByRole("separator");
    expect(handle).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("sets correct cursor class for vertical", () => {
    render(<ResizeHandle orientation="vertical" onResize={() => {}} />);
    expect(screen.getByRole("separator")).toHaveClass("cursor-col-resize");
  });

  it("sets correct cursor class for horizontal", () => {
    render(<ResizeHandle orientation="horizontal" onResize={() => {}} />);
    expect(screen.getByRole("separator")).toHaveClass("cursor-row-resize");
  });

  it("calls onResize with delta during drag", () => {
    const onResize = vi.fn();
    render(<ResizeHandle orientation="vertical" onResize={onResize} />);
    const handle = screen.getByRole("separator");

    fireEvent.pointerDown(handle, { clientX: 100, clientY: 100 });
    fireEvent.pointerMove(document, { clientX: 120, clientY: 100 });
    fireEvent.pointerUp(document);

    expect(onResize).toHaveBeenCalledWith(20);
  });

  it("calls onResizeEnd when drag ends", () => {
    const onResizeEnd = vi.fn();
    render(<ResizeHandle orientation="vertical" onResize={() => {}} onResizeEnd={onResizeEnd} />);
    const handle = screen.getByRole("separator");

    fireEvent.pointerDown(handle, { clientX: 100, clientY: 100 });
    fireEvent.pointerMove(document, { clientX: 120, clientY: 100 });
    fireEvent.pointerUp(document);

    expect(onResizeEnd).toHaveBeenCalledOnce();
  });

  it("uses clientY for horizontal orientation", () => {
    const onResize = vi.fn();
    render(<ResizeHandle orientation="horizontal" onResize={onResize} />);
    const handle = screen.getByRole("separator");

    fireEvent.pointerDown(handle, { clientX: 100, clientY: 200 });
    fireEvent.pointerMove(document, { clientX: 100, clientY: 180 });
    fireEvent.pointerUp(document);

    expect(onResize).toHaveBeenCalledWith(-20);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/layout/resize-handle.test.tsx --project=unit
```

Expected: FAIL — module `./resize-handle` not found.

- [ ] **Step 3: Implement ResizeHandle**

Create `src/components/layout/resize-handle.tsx`:

```tsx
import { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

interface ResizeHandleProps {
  orientation: "vertical" | "horizontal";
  onResize: (delta: number) => void;
  onResizeEnd?: () => void;
}

function ResizeHandle({ orientation, onResize, onResizeEnd }: ResizeHandleProps) {
  const isVertical = orientation === "vertical";
  const startPosRef = useRef(0);
  const isDraggingRef = useRef(false);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      isDraggingRef.current = true;
      startPosRef.current = isVertical ? e.clientX : e.clientY;

      const handlePointerMove = (moveEvent: PointerEvent) => {
        if (!isDraggingRef.current) return;
        const currentPos = isVertical ? moveEvent.clientX : moveEvent.clientY;
        const delta = currentPos - startPosRef.current;
        if (delta !== 0) {
          onResize(delta);
          startPosRef.current = currentPos;
        }
      };

      const handlePointerUp = () => {
        isDraggingRef.current = false;
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
        onResizeEnd?.();
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [isVertical, onResize, onResizeEnd],
  );

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      onPointerDown={handlePointerDown}
      className={cn(
        "group shrink-0 touch-none select-none",
        isVertical ? "cursor-col-resize px-px" : "cursor-row-resize py-px",
      )}
    >
      <div
        className={cn(
          "group-hover:bg-border group-active:bg-primary bg-transparent transition-colors duration-[--duration-snappy]",
          isVertical ? "h-full w-px" : "h-px w-full",
        )}
      />
    </div>
  );
}

export { ResizeHandle };
export type { ResizeHandleProps };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/layout/resize-handle.test.tsx --project=unit
```

Expected: All 7 tests PASS.

- [ ] **Step 5: Create ResizeHandle story**

Create `src/stories/layout/ResizeHandle.stories.tsx`:

```tsx
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResizeHandle } from "@/components/layout/resize-handle";

const meta: Meta<typeof ResizeHandle> = {
  title: "Layout/ResizeHandle",
  component: ResizeHandle,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof ResizeHandle>;

export const Vertical: Story = {
  render: () => {
    const [width, setWidth] = useState(200);
    return (
      <div className="flex h-64">
        <div className="bg-surface-1 flex items-center justify-center text-sm" style={{ width }}>
          {width}px
        </div>
        <ResizeHandle
          orientation="vertical"
          onResize={(delta) => setWidth((w) => Math.max(100, Math.min(400, w + delta)))}
        />
        <div className="bg-background text-fg-secondary flex flex-1 items-center justify-center text-sm">
          Main content
        </div>
      </div>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [height, setHeight] = useState(150);
    return (
      <div className="flex h-96 flex-col">
        <div className="bg-background text-fg-secondary flex flex-1 items-center justify-center text-sm">
          Main content
        </div>
        <ResizeHandle
          orientation="horizontal"
          onResize={(delta) => setHeight((h) => Math.max(80, Math.min(300, h - delta)))}
        />
        <div className="bg-surface-1 flex items-center justify-center text-sm" style={{ height }}>
          {height}px
        </div>
      </div>
    );
  },
};
```

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/resize-handle.tsx src/components/layout/resize-handle.test.tsx src/stories/layout/ResizeHandle.stories.tsx
git commit -m "feat: add ResizeHandle component with pointer event drag behavior"
```

---

### Task 11: TopBar Component

**Files:**

- Create: `src/components/layout/top-bar.tsx`
- Test: `src/components/layout/top-bar.test.tsx`
- Create: `src/stories/layout/TopBar.stories.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/layout/top-bar.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TopBar } from "./top-bar";

describe("TopBar", () => {
  it("renders the default canvas name", () => {
    render(<TopBar />);
    expect(screen.getByText("Provisional Canvas")).toBeInTheDocument();
  });

  it("renders a custom canvas name", () => {
    render(<TopBar canvasName="My Workspace" />);
    expect(screen.getByText("My Workspace")).toBeInTheDocument();
  });

  it("renders the settings button", () => {
    render(<TopBar />);
    expect(screen.getByRole("button", { name: /settings/i })).toBeInTheDocument();
  });

  it("renders the theme toggle", () => {
    render(<TopBar />);
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/layout/top-bar.test.tsx --project=unit
```

Expected: FAIL — module `./top-bar` not found.

- [ ] **Step 3: Implement TopBar**

Create `src/components/layout/top-bar.tsx`:

```tsx
import { Layers, Settings } from "lucide-react";
import { IconButton } from "@/components/common/icon-button";
import { ThemeToggle } from "@/components/common/theme-toggle";

interface TopBarProps {
  canvasName?: string;
}

function TopBar({ canvasName = "Provisional Canvas" }: TopBarProps) {
  return (
    <div className="bg-surface-1 border-border flex h-10 shrink-0 items-center justify-between border-b px-3">
      <div className="flex items-center gap-2">
        <Layers className="text-primary h-4 w-4" />
        <span className="font-ui text-foreground text-sm font-medium">{canvasName}</span>
      </div>
      <div className="flex items-center gap-0.5">
        <IconButton icon={Settings} label="Settings" tooltipSide="bottom" />
        <ThemeToggle />
      </div>
    </div>
  );
}

export { TopBar };
export type { TopBarProps };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/layout/top-bar.test.tsx --project=unit
```

Expected: All 4 tests PASS.

- [ ] **Step 5: Create TopBar story**

Create `src/stories/layout/TopBar.stories.tsx`:

```tsx
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
```

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/top-bar.tsx src/components/layout/top-bar.test.tsx src/stories/layout/TopBar.stories.tsx
git commit -m "feat: add TopBar component with logo, canvas name, settings, and theme toggle"
```

---

### Task 12: Panel Component

**Files:**

- Create: `src/components/layout/panel.tsx`
- Test: `src/components/layout/panel.test.tsx`
- Create: `src/stories/layout/Panel.stories.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/layout/panel.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { LayoutProvider } from "./layout-provider";
import { Panel } from "./panel";

function renderPanel(id: "left" | "inbox" | "bottom" = "left") {
  return render(
    <LayoutProvider>
      <div style={{ display: "flex", height: 400 }}>
        <Panel
          id={id}
          title="Test Panel"
          defaultSize={240}
          minSize={180}
          maxSize={400}
          resizeDirection="right"
        >
          <p>Panel content</p>
        </Panel>
      </div>
    </LayoutProvider>,
  );
}

describe("Panel", () => {
  it("renders children when expanded", () => {
    renderPanel();
    expect(screen.getByText("Panel content")).toBeInTheDocument();
  });

  it("renders the zone header with title", () => {
    renderPanel();
    expect(screen.getByText("Test Panel")).toBeInTheDocument();
  });

  it("shows collapsed strip when collapsed", async () => {
    const user = userEvent.setup();
    renderPanel();
    await user.click(screen.getByRole("button", { name: /collapse/i }));
    expect(screen.getByRole("button", { name: /expand test panel/i })).toBeInTheDocument();
    expect(screen.queryByText("Panel content")).not.toBeInTheDocument();
  });

  it("expands when collapsed strip is clicked", async () => {
    const user = userEvent.setup();
    renderPanel();
    await user.click(screen.getByRole("button", { name: /collapse/i }));
    await user.click(screen.getByRole("button", { name: /expand test panel/i }));
    expect(screen.getByText("Panel content")).toBeInTheDocument();
  });

  it("renders header actions", () => {
    render(
      <LayoutProvider>
        <div style={{ display: "flex", height: 400 }}>
          <Panel
            id="left"
            title="Tools"
            defaultSize={240}
            minSize={180}
            maxSize={400}
            resizeDirection="right"
            headerActions={<button>Add</button>}
          >
            Content
          </Panel>
        </div>
      </LayoutProvider>,
    );
    expect(screen.getByText("Add")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/layout/panel.test.tsx --project=unit
```

Expected: FAIL — module `./panel` not found.

- [ ] **Step 3: Implement Panel**

Create `src/components/layout/panel.tsx`:

```tsx
import type { ReactNode } from "react";
import { useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ZoneHeader } from "./zone-header";
import { CollapsedStrip } from "./collapsed-strip";
import { ResizeHandle } from "./resize-handle";
import { useLayout } from "./layout-provider";
import type { PanelId } from "./layout-provider";
import { cn } from "@/lib/utils";

interface PanelProps {
  id: PanelId;
  title: string;
  headerActions?: ReactNode;
  children: ReactNode;
  defaultSize: number;
  minSize: number;
  maxSize: number;
  resizeDirection: "right" | "left" | "top";
}

const PANEL_STATE_KEYS: Record<PanelId, "leftPanel" | "inbox" | "bottomPanel"> = {
  left: "leftPanel",
  inbox: "inbox",
  bottom: "bottomPanel",
};

function Panel({
  id,
  title,
  headerActions,
  children,
  minSize,
  maxSize,
  resizeDirection,
}: PanelProps) {
  const layout = useLayout();
  const stateKey = PANEL_STATE_KEYS[id];
  const panelState = layout[stateKey];
  const isBottom = id === "bottom";
  const isVertical = !isBottom;

  const handleCollapse = useCallback(() => {
    layout.togglePanel(id);
  }, [layout, id]);

  const handleResize = useCallback(
    (delta: number) => {
      const multiplier = resizeDirection === "top" ? -1 : 1;
      layout.resizePanel(id, panelState.size + delta * multiplier);
    },
    [layout, id, panelState.size, resizeDirection],
  );

  if (panelState.collapsed) {
    return (
      <CollapsedStrip
        label={title}
        orientation={isVertical ? "vertical" : "horizontal"}
        onExpand={handleCollapse}
      />
    );
  }

  const resizeHandleOrientation = isVertical ? "vertical" : "horizontal";
  const showResizeBefore = resizeDirection === "left" || resizeDirection === "top";
  const showResizeAfter = resizeDirection === "right";

  const sizeStyle = isVertical
    ? { width: panelState.size, minWidth: minSize, maxWidth: maxSize }
    : { height: panelState.size, minHeight: minSize, maxHeight: maxSize };

  return (
    <>
      {showResizeBefore && (
        <ResizeHandle orientation={resizeHandleOrientation} onResize={handleResize} />
      )}
      <div
        className={cn(
          "bg-surface-1 flex shrink-0 overflow-hidden",
          isVertical ? "flex-col" : "flex-col",
        )}
        style={sizeStyle}
      >
        <ZoneHeader title={title} onCollapse={handleCollapse} actions={headerActions} />
        <ScrollArea className="flex-1">
          <div className="p-3">{children}</div>
        </ScrollArea>
      </div>
      {showResizeAfter && (
        <ResizeHandle orientation={resizeHandleOrientation} onResize={handleResize} />
      )}
    </>
  );
}

export { Panel };
export type { PanelProps };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/layout/panel.test.tsx --project=unit
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Create Panel story**

Create `src/stories/layout/Panel.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LayoutProvider } from "@/components/layout/layout-provider";
import { Panel } from "@/components/layout/panel";
import { Plus } from "lucide-react";
import { IconButton } from "@/components/common/icon-button";

const meta: Meta<typeof Panel> = {
  title: "Layout/Panel",
  component: Panel,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <LayoutProvider>
        <div className="flex h-96">
          <Story />
          <div className="bg-background text-fg-secondary flex flex-1 items-center justify-center text-sm">
            Workspace area
          </div>
        </div>
      </LayoutProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Panel>;

export const LeftPanel: Story = {
  args: {
    id: "left",
    title: "Tools",
    defaultSize: 240,
    minSize: 180,
    maxSize: 400,
    resizeDirection: "right",
    children: (
      <div className="space-y-2 text-sm">
        <p>Tool block 1</p>
        <p>Tool block 2</p>
        <p>Tool block 3</p>
      </div>
    ),
  },
};

export const InboxPanel: Story = {
  args: {
    id: "inbox",
    title: "Inbox",
    defaultSize: 280,
    minSize: 220,
    maxSize: 448,
    resizeDirection: "right",
    headerActions: <IconButton icon={Plus} label="New chat" />,
    children: (
      <div className="space-y-2 text-sm">
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className="bg-surface-2 rounded-md p-2">
            Inbox item {i + 1}
          </div>
        ))}
      </div>
    ),
  },
};

export const BottomPanel: Story = {
  decorators: [
    (Story) => (
      <LayoutProvider>
        <div className="flex h-96 flex-col">
          <div className="bg-background text-fg-secondary flex flex-1 items-center justify-center text-sm">
            Workspace area
          </div>
          <Story />
        </div>
      </LayoutProvider>
    ),
  ],
  args: {
    id: "bottom",
    title: "Terminal",
    defaultSize: 200,
    minSize: 120,
    maxSize: 400,
    resizeDirection: "top",
    children: (
      <div className="font-mono text-sm">
        <p className="text-fg-secondary">$ npm run dev</p>
        <p className="text-status-completed">Server running on port 5173</p>
      </div>
    ),
  },
};
```

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/panel.tsx src/components/layout/panel.test.tsx src/stories/layout/Panel.stories.tsx
git commit -m "feat: add Panel component with collapse, resize, and scroll"
```

---

### Task 13: Workspace Component

**Files:**

- Create: `src/components/layout/workspace.tsx`
- Test: `src/components/layout/workspace.test.tsx`

No standalone story — Workspace is always shown as part of AppShell in Task 14.

- [ ] **Step 1: Write the failing tests**

Create `src/components/layout/workspace.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Workspace } from "./workspace";

describe("Workspace", () => {
  it("renders children", () => {
    render(<Workspace>Workspace content</Workspace>);
    expect(screen.getByText("Workspace content")).toBeInTheDocument();
  });

  it("renders the context bar with default title", () => {
    render(<Workspace>Content</Workspace>);
    expect(screen.getByText("Agent Workspace")).toBeInTheDocument();
  });

  it("renders bottomPanel slot outside the scroll area", () => {
    render(<Workspace bottomPanel={<div>Bottom panel content</div>}>Main content</Workspace>);
    expect(screen.getByText("Bottom panel content")).toBeInTheDocument();
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/layout/workspace.test.tsx --project=unit
```

Expected: FAIL — module `./workspace` not found.

- [ ] **Step 3: Implement Workspace**

Create `src/components/layout/workspace.tsx`:

```tsx
import type { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ZoneHeader } from "./zone-header";

interface WorkspaceProps {
  children: ReactNode;
  bottomPanel?: ReactNode;
}

function Workspace({ children, bottomPanel }: WorkspaceProps) {
  return (
    <div className="bg-background flex min-w-0 flex-1 flex-col overflow-hidden">
      <ZoneHeader title="Agent Workspace" />
      <ScrollArea className="flex-1">
        <div className="p-3">{children}</div>
      </ScrollArea>
      {bottomPanel}
    </div>
  );
}

export { Workspace };
export type { WorkspaceProps };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/layout/workspace.test.tsx --project=unit
```

Expected: All 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/workspace.tsx src/components/layout/workspace.test.tsx
git commit -m "feat: add Workspace component with context bar"
```

---

### Task 14: AppShell Composition + Story

**Files:**

- Create: `src/components/layout/app-shell.tsx`
- Test: `src/components/layout/app-shell.test.tsx`
- Create: `src/stories/layout/AppShell.stories.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/layout/app-shell.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { AppShell } from "./app-shell";

describe("AppShell", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the top bar", () => {
    render(<AppShell />);
    expect(screen.getByText("Provisional Canvas")).toBeInTheDocument();
  });

  it("renders the left panel", () => {
    render(<AppShell />);
    expect(screen.getByText("Tools")).toBeInTheDocument();
  });

  it("renders the inbox panel", () => {
    render(<AppShell />);
    expect(screen.getByText("Inbox")).toBeInTheDocument();
  });

  it("renders the workspace", () => {
    render(<AppShell />);
    expect(screen.getByText("Agent Workspace")).toBeInTheDocument();
  });

  it("renders the bottom panel", () => {
    render(<AppShell />);
    expect(screen.getByText("Terminal")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run src/components/layout/app-shell.test.tsx --project=unit
```

Expected: FAIL — module `./app-shell` not found.

- [ ] **Step 3: Implement AppShell**

Create `src/components/layout/app-shell.tsx`:

```tsx
import { LayoutProvider } from "./layout-provider";
import { TopBar } from "./top-bar";
import { Panel } from "./panel";
import { Workspace } from "./workspace";

function AppShell() {
  return (
    <LayoutProvider>
      <div className="flex h-screen flex-col">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <Panel
            id="left"
            title="Tools"
            resizeDirection="right"
            defaultSize={240}
            minSize={180}
            maxSize={400}
          >
            <p className="text-fg-secondary text-sm">Customizable blocks go here</p>
          </Panel>
          <Panel
            id="inbox"
            title="Inbox"
            resizeDirection="right"
            defaultSize={280}
            minSize={220}
            maxSize={448}
          >
            <p className="text-fg-secondary text-sm">Inbox items go here</p>
          </Panel>
          <Workspace
            bottomPanel={
              <Panel
                id="bottom"
                title="Terminal"
                resizeDirection="top"
                defaultSize={200}
                minSize={120}
                maxSize={400}
              >
                <p className="text-fg-secondary text-sm">Terminal / logs go here</p>
              </Panel>
            }
          >
            <p className="text-fg-secondary text-sm">Agent workspace content goes here</p>
          </Workspace>
        </div>
      </div>
    </LayoutProvider>
  );
}

export { AppShell };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run src/components/layout/app-shell.test.tsx --project=unit
```

Expected: All 5 tests PASS.

- [ ] **Step 5: Create AppShell story**

Create `src/stories/layout/AppShell.stories.tsx`:

```tsx
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
```

- [ ] **Step 6: Verify in Storybook**

Open Storybook at port 6006. Navigate to "Layout/AppShell". Verify:

- Top bar spans full width with logo, name, settings, and theme toggle
- Left panel, inbox sidebar, and workspace are visible side by side
- Bottom panel is inside the workspace
- All panels can be collapsed and expanded
- Resize handles work on panel borders
- Light and dark mode both render correctly via Storybook theme toggle

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/app-shell.tsx src/components/layout/app-shell.test.tsx src/stories/layout/AppShell.stories.tsx
git commit -m "feat: add AppShell layout composition with all four zones"
```

---

### Task 15: Wire AppShell into App.tsx

**Files:**

- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Update the existing App test**

Modify `src/App.test.tsx` to test for the AppShell:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the app shell with canvas name", () => {
    render(<App />);
    expect(screen.getByText("Provisional Canvas")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/App.test.tsx --project=unit
```

Expected: May pass or fail depending on current App.tsx content. The important thing is the assertion targets the new AppShell.

- [ ] **Step 3: Update App.tsx**

Modify `src/App.tsx`:

```tsx
import { AppShell } from "@/components/layout/app-shell";

function App() {
  return <AppShell />;
}

export default App;
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/App.test.tsx --project=unit
```

Expected: PASS.

- [ ] **Step 5: Run all tests**

```bash
npx vitest run --project=unit
```

Expected: All tests PASS.

- [ ] **Step 6: Verify build**

```bash
npm run build
```

Expected: Clean build with no type errors.

- [ ] **Step 7: Verify dev server**

```bash
npm run dev
```

Open http://localhost:5173 in a browser. Verify the four-zone layout renders correctly with the top bar, left panel, inbox sidebar, workspace, and bottom panel.

- [ ] **Step 8: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "feat: wire AppShell into App entry point"
```
