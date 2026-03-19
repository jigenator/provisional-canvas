# Components & Layout Shell Design

## Overview

Install shadcn base primitives, create wrapper components for project-specific behavior, build custom layout components, write Storybook stories for everything, and compose into the four-zone layout shell.

### Scope

This spec covers the **desktop experience only**. Responsive behavior (tablet landscape/portrait, mobile) as described in `uiux_direction.md` is out of scope and will be designed separately. Panel collapse/expand in this pass uses flex shrink, not floating overlays.

### Design Decisions

- **Panel architecture:** Single generic `Panel` component. The three collapsible panels (left, inbox, bottom) share enough behavior (collapse, resize, header, strip) that a single component with orientation/direction props is the right abstraction.
- **State management:** Shared `LayoutContext` provider holds all panel states. Enables keyboard shortcuts, coordinated behavior, and workspace flex-fill calculation.
- **shadcn components are never modified directly.** Wrapper components in `common/` extend behavior without touching `ui/` files.

### Principles

- `ui/` is shadcn's territory — install only, never edit
- `common/` wraps `ui/` components with project-specific behavior
- `layout/` contains the structural shell components
- Every component gets a Storybook story
- Icons via `lucide-react` (already a shadcn dependency)
- All sizing values use 4px multiples per the spacing foundation

## File Structure

```
src/components/
├── ui/                    # shadcn primitives (never modify)
│   ├── button.tsx         # (already installed)
│   ├── badge.tsx
│   ├── input.tsx
│   ├── scroll-area.tsx
│   ├── separator.tsx
│   ├── toggle.tsx
│   └── tooltip.tsx
├── common/                # wrapper components
│   ├── icon-button.tsx
│   ├── search-input.tsx
│   ├── status-badge.tsx
│   └── theme-toggle.tsx
└── layout/                # layout components
    ├── app-shell.tsx
    ├── collapsed-strip.tsx
    ├── layout-provider.tsx
    ├── panel.tsx
    ├── resize-handle.tsx
    ├── top-bar.tsx
    ├── workspace.tsx
    └── zone-header.tsx

src/stories/
├── DesignTokens.stories.tsx    # (existing)
├── ui/                         # shadcn primitive stories
│   ├── Badge.stories.tsx
│   ├── Input.stories.tsx
│   ├── ScrollArea.stories.tsx
│   ├── Separator.stories.tsx
│   ├── Toggle.stories.tsx
│   └── Tooltip.stories.tsx
├── common/                     # wrapper component stories
│   ├── IconButton.stories.tsx
│   ├── SearchInput.stories.tsx
│   ├── StatusBadge.stories.tsx
│   └── ThemeToggle.stories.tsx
└── layout/                     # layout component stories
    ├── TopBar.stories.tsx
    ├── ZoneHeader.stories.tsx
    ├── CollapsedStrip.stories.tsx
    ├── ResizeHandle.stories.tsx
    ├── Panel.stories.tsx
    └── AppShell.stories.tsx
```

## Layer 1: shadcn Primitives

Install as-is via `npx shadcn@latest add <name>`. Each gets a Storybook story showing variants with our design tokens applied.

| Component  | Key Variants to Story                    | Notes                        |
| ---------- | ---------------------------------------- | ---------------------------- |
| Badge      | default, secondary, destructive, outline | Base for StatusBadge wrapper |
| Input      | default, disabled, with placeholder      | Base for SearchInput wrapper |
| ScrollArea | vertical, horizontal, both               | Used in panels, inbox list   |
| Separator  | horizontal, vertical                     | Zone dividers                |
| Toggle     | default, pressed, disabled               | Base for ThemeToggle wrapper |
| Tooltip    | top, bottom, left, right placements      | Used by IconButton wrapper   |

Stories verify that warm cream (light) and terminal-depth (dark) tokens render correctly on each component.

## Layer 2: Wrapper Components

### StatusBadge

Wraps `Badge` with the five agent status variants.

```tsx
interface StatusBadgeProps {
  status: "running" | "attention" | "completed" | "error" | "idle";
  showDot?: boolean; // animated dot indicator (default: true)
  children?: ReactNode; // optional label override, defaults to status name
}
```

- Each status maps to its token color as background (muted) + foreground (vivid):
  - `running` → `bg-status-running/15 text-status-running`
  - `attention` → `bg-status-attention/15 text-status-attention`
  - `completed` → `bg-status-completed/15 text-status-completed`
  - `error` → `bg-status-error/15 text-status-error`
  - `idle` → `bg-status-idle/15 text-status-idle`
- `showDot` renders a small circle before the label — animated pulse for `running`, static for others
- Default label is the capitalized status name: "Running", "Needs Attention", "Completed", "Error", "Idle"

### ThemeToggle

Wraps `Toggle` with dark mode switching.

- Toggles `.dark` class on `document.documentElement`
- Sun icon (light mode) / Moon icon (dark mode) via lucide-react
- Persists preference to `localStorage`
- Respects `prefers-color-scheme` on first load if no stored preference

### SearchInput

Wraps `Input` with search affordances.

```tsx
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string; // defaults to "Search..."
}
```

- `Search` icon (lucide) fixed at left
- Clear button (`X` icon) appears when value is non-empty
- Compact height to fit inbox sidebar density

### IconButton

Wraps `Button` (ghost variant, icon size) + `Tooltip`.

```tsx
interface IconButtonProps {
  icon: LucideIcon;
  label: string; // tooltip text + aria-label
  onClick?: () => void;
  tooltipSide?: "top" | "bottom" | "left" | "right";
}
```

- Renders a ghost button with just the icon
- Tooltip shows `label` on hover
- `aria-label` set to `label` for accessibility
- Standard size across all toolbar positions (top bar, zone headers)

## Layer 3: Layout Components

### LayoutProvider / LayoutContext

Holds all panel states. Single source of truth for the shell.

```tsx
interface PanelState {
  collapsed: boolean;
  size: number; // px — width for side panels, height for bottom panel
}

interface LayoutContextValue {
  leftPanel: PanelState;
  inbox: PanelState;
  bottomPanel: PanelState;
  togglePanel: (panel: "left" | "inbox" | "bottom") => void;
  resizePanel: (panel: "left" | "inbox" | "bottom", size: number) => void;
}
```

- Wraps the entire app shell
- Each panel has default size + min/max constraints
- `togglePanel` flips collapsed state
- `resizePanel` clamps to min/max before setting
- Persists layout to `localStorage` so state survives reloads

**Default panel sizes (all 4px multiples):**

| Panel  | Default | Min   | Max   |
| ------ | ------- | ----- | ----- |
| Left   | 240px   | 180px | 400px |
| Inbox  | 280px   | 220px | 448px |
| Bottom | 200px   | 120px | 400px |

### TopBar

```tsx
interface TopBarProps {
  canvasName?: string; // defaults to "Provisional Canvas"
}
```

- Thin bar, full window width, `bg-surface-1`
- Left: logo (placeholder icon for now) + canvas name in `font-ui`
- Right: settings `IconButton` + `ThemeToggle`
- Fixed height (~40px), part of the slim UI shell
- Border-bottom using `border` token (subtle)

### ZoneHeader

```tsx
interface ZoneHeaderProps {
  title: string;
  onCollapse?: () => void;
  actions?: ReactNode; // slot for extra controls (e.g., "+" button)
}
```

- Consistent height across all three zones (~36px) — creates the horizontal visual line described in uiux_direction.md
- Title left-aligned, collapse chevron + optional actions right-aligned
- `font-ui`, `text-heading-3` size (16px)
- Chevron rotates on collapse (animated with `duration-snappy`)

### CollapsedStrip

```tsx
interface CollapsedStripProps {
  label: string;
  orientation: "vertical" | "horizontal"; // vertical for side panels, horizontal for bottom
  onExpand: () => void;
}
```

- Thin strip (~32px wide for vertical, ~32px tall for horizontal)
- Chevron icon pointing toward expand direction
- Text label rotated -90deg (reads bottom-to-top) for vertical strips
- Text label horizontal for the bottom strip (deviation from `uiux_direction.md` which specifies rotated text for all strips — horizontal text is more natural for a horizontal strip)
- Click anywhere on strip to expand
- `bg-surface-1`, subtle border on the workspace-facing edge

### ResizeHandle

```tsx
interface ResizeHandleProps {
  orientation: "vertical" | "horizontal"; // vertical = drag left/right, horizontal = drag up/down
  onResize: (delta: number) => void;
  onResizeEnd?: () => void;
}
```

- Invisible by default (~4px hit area), subtle visual line on hover
- Cursor changes to `col-resize` (vertical) or `row-resize` (horizontal)
- On hover: faint line appears using `border` token
- On drag: line becomes primary color (`primary` token)
- Uses pointer events (`pointerdown`/`pointermove`/`pointerup`) for smooth dragging
- Real-time resize — follows cursor exactly, no animation (per uiux_direction.md)

### Panel

Generic panel component. Composes ZoneHeader + CollapsedStrip + ResizeHandle + ScrollArea.

```tsx
interface PanelProps {
  id: "left" | "inbox" | "bottom";
  title: string;
  headerActions?: ReactNode;
  children: ReactNode;
  defaultSize: number;
  minSize: number;
  maxSize: number;
  resizeDirection: "right" | "left" | "top"; // which edge has the resize handle
}
```

- Reads its own `collapsed` and `size` from `LayoutContext`
- When collapsed: renders `CollapsedStrip` instead of content
- When expanded: `ZoneHeader` at top, `ScrollArea` wrapping children, `ResizeHandle` on the appropriate edge
- `bg-surface-1` background
- Transition between collapsed/expanded uses `duration-snappy`

### Workspace

```tsx
interface WorkspaceProps {
  children: ReactNode;
}
```

- Takes all remaining space (`flex-grow: 1`)
- Has its own `ZoneHeader` variant (the context bar — title + agent status info, placeholder for now)
- Contains the bottom `Panel` within it (workspace stacks vertically: context bar → content → bottom panel)
- `bg-background` (base level, not elevated)

### AppShell

Root layout component. Composes everything.

```tsx
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
        {/* placeholder content */}
      </Panel>
      <Panel
        id="inbox"
        title="Inbox"
        resizeDirection="right"
        defaultSize={280}
        minSize={220}
        maxSize={448}
      >
        {/* placeholder content */}
      </Panel>
      <Workspace>
        {/* placeholder content */}
        <Panel
          id="bottom"
          title="Terminal"
          resizeDirection="top"
          defaultSize={200}
          minSize={120}
          maxSize={400}
        >
          {/* placeholder content */}
        </Panel>
      </Workspace>
    </div>
  </div>
</LayoutProvider>
```

## Storybook Strategy

### Story organization

```
src/stories/
├── ui/        # shadcn primitive variant showcases
├── common/    # interactive wrapper demos
└── layout/    # layout component stories + full AppShell
```

### Story requirements

- Every story shows both light and dark mode (using Storybook's theme toggle from `.storybook/preview.ts`)
- `ui/` stories are minimal — variant showcases to verify token rendering
- `common/` stories show interactive states (e.g., StatusBadge with all 5 statuses, SearchInput with typing)
- `layout/` stories build up incrementally — individual components first, then `AppShell` composes the full four-zone layout
- `AppShell.stories.tsx` renders the complete layout with placeholder content in each zone

## Token Usage Reference

Components use the design tokens from `globals.css` via Tailwind utility classes:

- **Backgrounds:** `bg-background`, `bg-surface-1`, `bg-surface-2`, `bg-surface-3`, `bg-terminal`
- **Text:** `text-foreground`, `text-fg-secondary`, `text-fg-muted`
- **Status:** `text-status-running`, `text-status-attention`, `text-status-completed`, `text-status-error`, `text-status-idle`
- **Primary:** `text-primary`, `bg-primary`
- **Border:** `border-border`
- **Typography:** `font-ui`, `font-mono`
- **Radius:** `rounded-sm`, `rounded-md`, `rounded-lg`
- **Motion:** `duration-[--duration-snappy]`, `duration-[--duration-gentle]`
- **Shadow:** `shadow-[--shadow-float]`
