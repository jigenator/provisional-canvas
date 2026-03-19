# UI/UX Direction

## Layout

**Global Top Bar**

- Thin bar spanning full window width, edge to edge, above all zones
- Left: logo + customizable canvas name. Right: settings icon + light/dark mode toggle
- Part of the slim UI shell — minimal height

**Four-Zone Structure (below the global top bar):**

- **Left persistent panel** — full height, collapsible, user-resizable width (drag right border). Default width with min/max constraints. Contains user-customizable blocks that persist across inbox item changes. Header: user-settable contextual label + collapse/expand control.
- **Inbox sidebar** — full height, collapsible, user-resizable width. Dense, scannable inbox item list. Navigation spine of the app. Header: title ("Inbox") + collapse/expand control.
- **Agent workspace** — takes all remaining space. The flexible zone that absorbs layout changes. Blocks reconfigure per agent type as user navigates inbox items. Context bar: user-editable title, agent type name, agent status indicator, token usage, creation date, runtime duration.
- **Bottom persistent panel** — spans workspace width only (not under left panel or sidebar). Collapsible, user-resizable height (drag top edge). Default height with min/max constraints. Contains user-customizable blocks that persist across inbox item changes.

**Spatial order (left to right):** Left panel | Inbox sidebar | Agent workspace (with bottom panel beneath workspace only). This order is maintained even when zones are collapsed.

**Zone Headers:** Left panel header, inbox header, and workspace context bar are all the same height, creating a consistent horizontal visual line.

**Collapse Behavior:** All three collapsible zones (left panel, sidebar, bottom panel) reduce to a consistent thin strip indicator when collapsed — chevron icon + vertical text label (rotated -90 degrees, reads bottom-to-top). Strips maintain their spatial position.

**Resize Behavior:** Left panel and sidebar are width-resizable via drag. Bottom panel is height-resizable via drag. All have sensible defaults with min/max constraints. Agent workspace is never directly resizable — it fills remaining space.

**Responsive Behavior**

**Desktop (full experience):**

- All four zones visible by default
- Collapsed zones compress the workspace
- Keyboard-first navigation

**Tablet landscape:**

- Global top bar + inbox sidebar + agent workspace visible
- Left panel and bottom panel collapsed by default (strips visible)
- Collapsed zones open as floating overlays on top of the workspace, not compressing it

**Tablet portrait:**

- Global top bar + agent workspace + bottom panel visible
- Left panel and inbox sidebar collapsed by default (strips visible)
- Collapsed zones open as floating overlays

**Mobile:**

- Global top bar + agent workspace only
- All zones collapsed to strips
- All zones open as floating overlays
- Swipe left/right on workspace for next/previous inbox navigation (same priority-smart logic)

**Core responsive principle:** On smaller screens, collapsed zones overlay the workspace rather than compressing it. The workspace always has full available width. Thin strips are always visible for access.

**Block Responsive Behavior:**

- **Desktop:** Full 2D grid, user arranges freely across available columns
- **Tablet:** Grid columns reduce. Blocks that can't fit side-by-side at their minimum width wrap to the next row. Some horizontal arrangement still possible.
- **Mobile:** All blocks collapse to single column, full width, stacked vertically. Order determined by reading order from the desktop layout (left-to-right, top-to-bottom).
- **Core rule:** Blocks never shrink below their minimum readable/usable size. The grid adapts by reducing columns, not by shrinking blocks.

## Components

**Global Top Bar**

- Spans full window width, edge to edge
- Left: logo + customizable canvas name. Right: settings icon + light/dark mode toggle
- Thin, minimal — part of the slim UI shell

**Zone Headers (all same height, titles horizontally aligned)**

- **Left panel header:** Title (user-settable label) + collapse/expand control
- **Inbox header:** Title ("Inbox") + collapse/expand control
- **Workspace context bar:** Title (user-editable) + agent type name, agent status indicator, token usage, creation date, runtime duration
- Titles sit at the same vertical position across all three, creating a consistent visual line

**Inbox Sidebar Structure**

- **Header** — title + collapse/expand
- **Stats bar** — all agent status counts + total inbox items. Always visible below header, above search. Serves as the catch-up summary when returning after absence.
- **Search box** — dedicated row below stats bar, above items list. Filter/find inbox items.
- **Items list** — scrollable list of inbox items, grouped by status categories
- **Status categories** — displayed in priority order: Pinned → Needs Attention → Completed → Running → Error → Idle. Each category has a header. Empty categories auto-minimize to just the header. User can manually collapse any category. Collapsed non-empty categories show item count (e.g., "▶ Running (3)").

**Inbox Item**

- Displays: agent name, status indicator (running/needs attention/completed/error/idle), brief context line, timestamp
- Active state: floats in place with glass visual effect + slight skew. Items below flow up to fill the gap. Deactivates when user navigates away, clicks outside workspace, or clicks the floating item again — item returns to its priority position.
- Needs-attention state: subtle background tint or left border accent — visible but not loud
- Selected (non-floating) state: background highlight + left border accent
- Each status gets a distinct color from the purposeful palette

**Block Container**

- No visible borders — borderless like Notion. Content defines the block.
- Content hugs edges — headers, icons, buttons sit flush against grid boundary. No dead space between content and grid boundary.
- Edge-to-edge horizontal elements within the block
- Default text alignment is left-aligned, flush to edge. Users can override alignment for their own authored content.
- Action icons (close, configure, drag handle) appear on hover only
- Freeform Notion-style content authoring — users create headings, text, lists, dividers alongside specialized agent blocks (chat, terminal, etc.)

**Block Grid**

- Grid snap with flexible sizing — blocks snap to fine-grained grid positions, can span multiple units
- Grid units are small enough to support small elements (e.g., a button at 1x1)
- Each block type defines its own minimum grid dimensions (e.g., chat window minimum larger than a button)
- Blocks can expand from their minimum up to the full size of their zone. No maximum cap.
- No overlap under any circumstances — blocks tile and push each other
- All zones share one unified grid. Block rows and columns align across zone boundaries — left panel, agent workspace, and bottom panel all sit on the same invisible grid.
- Grid is based on the 4px spacing foundation. Grid lines are globally consistent even as zones resize.

**Agent Workspace Blocks**

- Agent type template defines default block layout for that agent type
- Per-inbox-item overrides — if user rearranges blocks for a specific inbox item, the customization saves to that item only. Other inbox items of the same agent type keep the template default.

**Collapsed Zone Strip**

- Consistent thin strip for all three collapsible zones
- Side panels: chevron icon + vertical text label (rotated -90 degrees, reads bottom-to-top)
- Bottom panel: chevron icon + horizontal text label
- Maintains spatial position when collapsed

**Settings Modal**

- Overlay on top of canvas, canvas dimmed behind
- Horizontal tabs across top: Agents, Themes, Shortcuts (and future categories)
- Scrollable content within each tab if it overflows
- Settings icon in global top bar, right side. Also accessible via command palette.
- Focus trapped in modal until dismissed

**Keyboard Cheat Sheet / Command Palette**

- Single overlay, dual purpose
- Two tabs always visible: Chat (default) and Commands. Tab key swaps between them.
- Chat tab: type question/task → select agent type → enter → creates new inbox item
- Commands tab: browse/search shortcuts and execute actions
- Smart detection surfaces relevant suggestions regardless of active tab
- Search bar at top, Superhuman-style. Single list below grouped by section headers, filterable by search.
- Focus trapped in overlay until dismissed

**New Chat / New Inbox Item**

- "+" button in inbox header area for discoverability and mouse users
- Command palette Chat tab as the primary keyboard path
- Flow: type message → select agent type → enter → new inbox item created and opened

**Light/Dark Mode Toggle**

- Persistent icon in the global top bar, right side
- Quick access without entering settings
- Also accessible via command palette

## Interaction Flows

**Inbox Priority System**

- Categories displayed in order: Pinned → Needs Attention → Completed → Running → Error → Idle
- Within each category: oldest first (longest waiting / longest running at top)
- Empty categories auto-minimize to just the header. Expand when items enter.
- User can manually collapse any category. Collapsed non-empty categories show item count in header.
- Items animate when moving between categories — user can visually track status changes.

**Status Definitions**

- **Needs attention** — agent is actively waiting for user input. Blocking.
- **Completed** — agent finished while user wasn't looking. Result not yet reviewed. Like an unread message.
- **Running** — agent is working. Nothing for the user to do right now.
- **Error** — something went wrong. Below running in priority because auto-retry handles transient errors; only persistent errors remain here.
- **Idle** — user has seen the inbox item and decided not to do anything with it.

**Active Item Floating**

- When a user selects an inbox item, it floats in place — glass visual effect + slight skew. Items below flow up to fill the gap.
- The floating item stays at its original vertical position. It scrolls with the list.
- The floating item is undisturbed by status changes and category repositioning happening around it.
- Deactivation: user navigates away (next/previous), clicks outside the workspace, or clicks the floating item again. The item returns to its rightful priority position in the list.

**"Next" / "Previous" Navigation**

- **"Next" is priority-smart:**
  1. If Needs Attention items exist → jumps to oldest needs-attention item (interrupt)
  2. Else if Completed items exist → jumps to oldest completed item (interrupt)
  3. Else → moves linearly to the next item below
- **"Previous" is linear history** — always goes back to the last item you were on.
- **Mobile:** Swipe left on workspace for next, swipe right for previous. Same priority-smart logic.

**Block Customization**

- "+" button in each zone header (left panel, agent workspace, bottom panel) — opens block picker
- Slash command — type "/" within a zone to search and insert blocks. Power-user path.

**Collapse/Expand Panels**

- Each collapsible zone has a collapse control in its header
- Collapsed zones show a thin strip with chevron + vertical rotated label
- Expand by clicking the strip or using a hotkey
- On mobile/tablet: expanded zones float as overlays on top of the workspace

**Settings**

- Opened via settings icon in global top bar, hotkey, or command palette
- Modal overlay, canvas dimmed behind, focus trapped
- Tabs: Agents, Themes, Shortcuts

**App Launch (Returning User)**

- State preserved — last active inbox item selected, workspace restored
- Stats bar shows current agent status counts — serves as the catch-up summary

## Visual Direction

**Color — Dark Mode**

- Terminal content sits at the deepest level (~#1E1E1E) as the dark anchor
- Base background: ~#232323
- Surface 1 (zone backgrounds): ~#282828
- Surface 2 (elevated elements, blocks, floating item): ~#2E2E2E
- Surface 3 (hover states, active elements): ~#343434
- Terminal always reads as "a window into something deeper," UI layers above it

**Color — Light Mode**

- Noticeably warm cream — clearly cozy compared to pure white, not parchment-rich
- Same layering approach inverted — base is lightest, surfaces get slightly warmer/darker
- Warm-tinted throughout, cozy game aesthetic

**Status Colors (vivid, confident against neutral canvas)**

- Running: blue — calm, active, steady progress
- Needs attention: amber/warm yellow — urgent but not alarming
- Completed: green — fresh, slightly warm
- Error: soft red/coral — muted, not aggressive
- Idle: gray with a hint of purple — present but inactive

**UI Colors**

- Accent: warm teal/muted cyan — distinctive, works in both modes, calm but alive
- Foreground primary: near-white (dark mode), warm near-black (light mode) — main text
- Foreground secondary: mid-gray, warm-tinted in light mode — timestamps, context lines, captions
- Border: very subtle, barely visible. Used sparingly — only for structural zone dividers

**Typography (directional)**

- UI text: warm sans-serif (DM Sans / Plus Jakarta Sans direction)
- Agent/technical content: monospace (JetBrains Mono / Fira Code direction)
- Role hierarchy: heading, body, caption, code — sizes determined during implementation
- One typeface system across both modes

**Spacing**

- Base unit: 4px (locked). All spacing values are multiples of 4px.
- Block grid unit: directional — determined during implementation, will be a multiple of 4px

**Shape Language (directional)**

- Subtly rounded — slight border radius that softens without being bubbly
- Consistent across both modes
- Specific radius values determined during implementation

**Elevation / Shadows**

- Shadows only for elements that float above the main canvas layer: floating inbox item, settings modal, command palette/cheat sheet overlay, tooltips, block hover action icons
- All other depth created through surface color layering, not shadows

**Theming**

- Fully themeable visuals: colors, typography, logo, backgrounds (images, gradients, opacity)
- Structural elements stay fixed: layout (four zones), spacing base unit, interaction behavior
- Themes change how it looks, not how it works

**Block Sizing & Alignment**

- Blocks can expand from their minimum grid dimensions up to the full size of their zone. No maximum cap.
- All zones share one unified grid. Block rows and columns align across zone boundaries — left panel, agent workspace, and bottom panel all sit on the same invisible grid.
- Grid is based on the 4px spacing foundation. Grid lines are globally consistent even as zones resize.

## Motion

**Philosophy:** Mixed speeds — user-initiated actions are snappy, system-initiated changes are gentle. You feel your own speed, the canvas breathes around you.

**User-initiated (snappy, ~100-150ms):**

- Selecting an inbox item / workspace reconfiguring
- Collapsing/expanding a panel
- Opening command palette / settings
- Block drag and snap

**System-initiated (gentle, ~200-300ms):**

- Inbox items animating between status categories
- Floating item glass effect appearing on selection
- Previously active item returning to priority position
- Empty categories minimizing/expanding
- Collapsed category count updating
- Floating item glass + skew animating away on deactivation
- Light/dark mode cross-fade transition
- New inbox item animating into the list
- Command palette / settings modal fade in and out

**Instant (no animation):**

- Block hover action icons appearing
- Inbox search filtering — non-matching items instantly hide

**Other:**

- Panel resize dragging: real-time, follows cursor exactly

**Easing (directional):**

- User actions: snappy ease-out
- System changes: gentle ease-in-out

**`prefers-reduced-motion`:**

- Position and size animations removed (instant)
- Opacity fades kept — UI still transitions smoothly without spatial movement

## Accessibility

**Keyboard Strategy**

- Keyboard shortcuts for core flow-state actions: inbox navigation (next/previous), collapse/expand panels, open command palette, open settings, toggle light/dark mode, open keyboard cheat sheet
- Mouse for spatial manipulation: clicking into zones, block customization (drag, resize, add), panel resize, interacting with specific blocks
- No tab-through-everything navigation — keep it simple, avoid UX complexity

**Focus Management**

- Overlays (settings modal, command palette) trap focus until dismissed
- On overlay dismissal, focus returns to where it was before the overlay opened

**Screen Reader Support**

- Not in initial scope. Focus on keyboard and contrast first. To be defined during implementation.

**Contrast Requirements**

- WCAG AA minimum across both modes (4.5:1 for normal text, 3:1 for large text/headings)
- Verify all foreground/background pairings — especially secondary text on surface colors and status colors on both mode backgrounds

**Motion Sensitivity**

- `prefers-reduced-motion`: position and size animations removed, opacity fades kept
