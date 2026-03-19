# Session Handoff

---

## Session 2 — 2026-03-20

### What Was Done

Built the complete four-zone layout shell — shadcn primitives, wrapper components, layout components, and full composition — using subagent-driven development with TDD and two-stage review (spec compliance + code quality).

#### Components & Layout Shell (15 tasks)

**Layer 1: shadcn Primitives (installed as-is, never modify)**

- `badge.tsx`, `input.tsx`, `scroll-area.tsx`, `separator.tsx`, `toggle.tsx`, `tooltip.tsx`
- `button.tsx` was already installed from project init
- Storybook stories for all 6 new primitives in `src/stories/ui/`

**Layer 2: Wrapper Components (`src/components/common/`)**

- **StatusBadge** — wraps Badge with 5 status variants (running/attention/completed/error/idle), animated pulse dot for running
- **ThemeToggle** — dark mode toggle using Button (not Toggle), persists to localStorage, respects `prefers-color-scheme`
- **SearchInput** — wraps Input with search icon, clear button, compact height
- **IconButton** — wraps Button (ghost/icon) + Tooltip, standard toolbar action pattern
- Tests and stories for all 4 wrappers

**Layer 3: Layout Components (`src/components/layout/`)**

- **LayoutProvider** — shared context for all panel state (collapse/resize), localStorage persistence, min/max constraints. Exports `useLayout()` hook, `PANEL_CONSTRAINTS`, `PANEL_STATE_KEYS`.
- **ZoneHeader** — consistent 36px header across all zones, title + optional collapse control + actions slot
- **CollapsedStrip** — thin strip when zone is collapsed. Vertical (side panels): w-8, text rotated via `[writing-mode:vertical-lr] rotate-180`. Horizontal (bottom panel): h-8, text horizontal.
- **ResizeHandle** — drag-to-resize with pointer events, invisible by default, visual feedback on hover/drag
- **TopBar** — global top bar (40px), logo + canvas name left, settings + theme toggle right
- **Panel** — generic collapsible/resizable panel composing ZoneHeader + CollapsedStrip + ResizeHandle + ScrollArea. Single component for all 3 panels.
- **Workspace** — main content area with `bottomPanel` prop slot (sits outside ScrollArea)
- **AppShell** — root composition: LayoutProvider > TopBar + left Panel + inbox Panel + Workspace(bottomPanel=bottom Panel)
- Tests and stories for all layout components (except Workspace — covered by AppShell story)

**App Entry Point**

- `App.tsx` now renders `<AppShell />`

#### Color Token Update

Updated status, primary, and destructive colors from pastel to saturated neon RPG-style:

| Token                | Before                  | After                       |
| -------------------- | ----------------------- | --------------------------- |
| `--primary`          | `#4e9e96` (muted teal)  | `#6184ff` (cornflower blue) |
| `--destructive`      | `#d4726c` (muted coral) | `#ff3355` (hot pink-red)    |
| `--ring`             | `#4e9e96`               | `#6184ff`                   |
| `--status-running`   | `#5b9ee9`               | `#00b4ff` (electric blue)   |
| `--status-attention` | `#e5a84b`               | `#ffaa00` (legendary gold)  |
| `--status-completed` | `#6bbf6b`               | `#00ff88` (neon mint)       |
| `--status-error`     | `#d4726c`               | `#ff3355` (hot pink-red)    |
| `--status-idle`      | `#8b82a8`               | `#b366ff` (arcane purple)   |

Primary was chosen for "clarity and calmness" — cornflower blue over teal, indigo, or violet alternatives.

#### Code Review Fixes

Post-implementation code quality review identified and fixed:

1. **Stale closure in `handleResize`** — fast drags could drop pixels. Added `resizePanelBy` to LayoutProvider that applies delta via `setState(prev => ...)` instead of closing over stale `panelState.size`.
2. **Context value recreated every render** — wrapped with `useMemo`.
3. **Unused `defaultSize` prop** — removed from Panel interface and all call sites.
4. **Duplicated `PANEL_STATE_KEYS`** — exported from LayoutProvider, imported in Panel.
5. **Unnecessary `cn()` call** — replaced with plain string literal.

#### Spec & Docs Updates

- **Design spec:** `docs/superpowers/specs/2026-03-19-components-and-layout-design.md`
- **Implementation plan:** `docs/superpowers/plans/2026-03-19-components-and-layout.md`
- **`docs/uiux_direction.md`** — updated collapsed strip section to differentiate side panels (vertical rotated text) from bottom panel (horizontal text)

### Decisions Made

- **Panel architecture:** single generic `Panel` component for all 3 collapsible zones (left, inbox, bottom) rather than specialized components
- **State management:** shared `LayoutContext` provider rather than local state per panel
- **ThemeToggle uses Button, not Toggle** — spec said Toggle but Button was implemented. Works fine but lacks `aria-pressed`. Consider switching to Toggle for proper ARIA semantics.
- **Desktop-only scope** — responsive behavior (tablet/mobile floating overlays) deferred to separate pass
- **Collapse uses flex shrink** — not floating overlays (that's the responsive pass)
- **Inbox max size 448px** — user caught that original 450px wasn't a 4px multiple
- **Bottom panel text horizontal** — spec deviation from uiux_direction.md which originally said all strips use vertical text. Updated uiux_direction.md to match.
- **Primary color: cornflower `#6184ff`** — chosen for clarity/calmness over teal, indigo, and violet alternatives. Status colors went neon RPG-style.

### Test & Build Status

- **65 unit tests passing** (Vitest, jsdom)
- **Clean TypeScript build** (`tsc --noEmit`)
- **Clean production build** (`npm run build`)
- **27 commits on main**, all pushed to origin

### Known Issues Added

5. **ResizeHandle doesn't use `setPointerCapture`** — pointer leaving browser window during drag could leave drag stuck on some platforms. Minor reliability improvement for a future pass.
6. **IconButton creates per-instance TooltipProvider** — works but could be lifted to app root for efficiency. Minor.
7. **`loadState` trusts localStorage JSON shape** — spread with defaults provides resilience but a `typeof` guard on parsed values would be more robust.

### Current Project Structure

```
src/
├── components/
│   ├── ui/                       # shadcn primitives (never modify)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── scroll-area.tsx
│   │   ├── separator.tsx
│   │   ├── toggle.tsx
│   │   └── tooltip.tsx
│   ├── common/                   # Wrapper components
│   │   ├── icon-button.tsx       + test + story
│   │   ├── search-input.tsx      + test + story
│   │   ├── status-badge.tsx      + test + story
│   │   └── theme-toggle.tsx      + test + story
│   └── layout/                   # Layout components
│       ├── app-shell.tsx         + test + story
│       ├── collapsed-strip.tsx   + test + story
│       ├── layout-provider.tsx   + test (no story — context provider)
│       ├── panel.tsx             + test + story
│       ├── resize-handle.tsx     + test + story
│       ├── top-bar.tsx           + test + story
│       ├── workspace.tsx         + test (no story — shown in AppShell)
│       └── zone-header.tsx       + test + story
├── stories/
│   ├── DesignTokens.stories.tsx
│   ├── ui/                       # 6 shadcn primitive stories
│   ├── common/                   # 4 wrapper component stories
│   └── layout/                   # 6 layout component stories
├── styles/
│   └── globals.css               # ALL design tokens
├── App.tsx                       # Renders <AppShell />
└── App.test.tsx
```

### What Comes Next

The layout shell is complete. Next features to build on top of it:

1. **Inbox item list** — the inbox sidebar's actual content: item cards with status indicators, priority categories, status-based grouping
2. **Agent workspace blocks** — block container system, block grid, agent type templates
3. **Command palette / keyboard cheat sheet** — the primary keyboard interaction path
4. **Keyboard shortcuts** — inbox navigation (next/previous priority-smart), panel collapse/expand, palette triggers
5. **Settings modal** — overlay with Agents/Themes/Shortcuts tabs

---

## Session 1 — 2026-03-19

### What Was Done

Full project initialization for Provisional Canvas — all infrastructure before feature code. Eight phases completed and verified:

#### Phase 1: Tech Stack Scaffold

- **Vite 8** + **React 19** + **TypeScript 5.9** + **Tailwind CSS v4**
- Path aliases: `@/*` → `src/*` via Vite's `resolve.tsconfigPaths: true`
- TypeScript project references: `tsconfig.json` → `tsconfig.app.json` (src) + `tsconfig.node.json` (config files)
- `package.json` has `"type": "module"` and `engines.node >= 22`

#### Phase 2: Design System Foundation

- **`src/styles/globals.css`** — single source of truth for all design tokens
- Token values derived from `docs/product_experience.md`, `docs/uiux_direction.md`, and `docs/superpowers/specs/2026-03-19-ui-tokens-design.md`
- **Light mode** (`:root` default): warm cream palette — `#F8F4EE` base, warm surfaces, `#2A2522` foreground
- **Dark mode** (`.dark` class): terminal-depth layering — `#232323` base, `#1E1E1E` terminal, `#E8E4E0` foreground
- **Status colors** (mode-independent): running `#5B9EE9`, attention `#E5A84B`, completed `#6BBF6B`, error `#D4726C`, idle `#8B82A8`
- **Primary/accent**: warm teal `#4E9E96`
- **Typography**: DM Sans (UI, `--font-ui`) + JetBrains Mono (code, `--font-mono`), loaded via Google Fonts `<link>` tags in `index.html`
- **Font sizes**: heading-1 24px, heading-2 20px, heading-3 16px, body 14px, caption 12px, code 13px
- **Spacing**: 4px base, scale at 1/2/3/4/5/6/8/10/12/16 multiples
- **Radius**: `--radius: 0.5rem` (8px) base, shadcn derives sm/md/lg/xl/2xl
- **Motion**: snappy 125ms (user actions), gentle 250ms (system), fade 200ms (opacity). `prefers-reduced-motion` zeros spatial durations, keeps fades.
- **Shadows**: `--shadow-float` with per-mode opacity (0.12 light, 0.4 dark)
- **shadcn/ui v4** initialized with `components.json` pointing to `src/styles/globals.css`. `cn()` utility at `src/lib/utils.ts`.
- shadcn button component installed and verified as proof the pipeline works.

#### Phase 3: Storybook

- **Storybook 10** (`@storybook/react-vite`)
- Addons: `addon-a11y`, `addon-themes`, `addon-vitest`, `addon-docs`, `addon-onboarding`, `@chromatic-com/storybook`
- Dark mode toggle configured via `withThemeByClassName` in `.storybook/preview.ts`
- `globals.css` imported in preview — all token stories render with correct values
- **Design token stories** at `src/stories/DesignTokens.stories.tsx` — visual reference for colors, typography, spacing, radius, shadows, motion
- **`@storybook/mcp`** server configured in `.mcp.json` for agent component discovery
- Example stories removed — only design system stories remain

#### Phase 4: Dev Tooling

- **ESLint 9** flat config (`eslint.config.js`)
  - Plugins: `typescript-eslint`, `react-hooks`, `react-refresh`, `jsx-a11y`
  - jsx-a11y is non-negotiable per WCAG AA requirements
- **Prettier** with `prettier-plugin-tailwindcss` for class sorting
  - Config: double quotes, semicolons, trailing commas, 100 char width
- Scripts: `lint`, `lint:fix`, `format`, `format:check`

#### Phase 5: Testing Infrastructure

- **Vitest 4** for unit tests (jsdom environment)
  - Test setup: `src/test/setup.ts` imports `@testing-library/jest-dom/vitest`
  - Testing Library: `@testing-library/react`, `@testing-library/user-event`, `@testing-library/dom`
  - Vitest project config in `vite.config.ts` — `unit` project for src tests, `storybook` project for story tests
- **Playwright** for e2e tests
  - Config: `playwright.config.ts`, tests in `e2e/` directory
  - Uses `npm run build && npm run preview -- --port 4173` as webServer (avoids port conflicts with dev server)
  - Chromium only for now
- Smoke tests: 1 unit test (`App.test.tsx`), 2 e2e tests (`e2e/smoke.spec.ts`)
- Scripts: `test`, `test:run`, `test:ui`, `test:coverage`, `test:e2e`

#### Phase 6: CI Pipeline

- **`.github/workflows/ci.yml`** — runs on push to main and PRs
- Four parallel jobs: `lint` (tsc + eslint + prettier), `test` (vitest unit), `e2e` (playwright), `build` (vite + storybook)
- Node 22, npm cache

#### Phase 7: Git Hooks

- **Husky** pre-commit hook runs `lint-staged`
- lint-staged config in `package.json`:
  - `*.{ts,tsx}`: eslint --fix + prettier --write
  - `*.{css,json,md}`: prettier --write

### Known Issues / Quirks

1. **`.npmrc` has `legacy-peer-deps=true`** — needed because `eslint-plugin-jsx-a11y` only supports ESLint ≤9 but `@eslint/js` v10 was pulled in by Storybook's dependencies. shadcn `add` commands also fail without this. This is a transient ecosystem issue that should resolve as plugins update.

2. **Storybook "No story files found for pattern: src/\*\*/\*.mdx" warning** — harmless, appears during vitest runs because the storybook project config scans for mdx files. No mdx stories exist yet.

3. **`vitest.shims.d.ts`** — generated by Storybook's addon-vitest setup. Don't delete it.

4. **`LICENSE` file deleted** — intentional per user direction. Only the three docs files (`mission.md`, `product_experience.md`, `uiux_direction.md`) were kept from the original repo alongside the design tokens spec.

5. **`docs/superpowers/plans/2026-03-19-ui-tokens.md`** — brainstorming/planning artifact from a previous session's design tokens work. Committed as-is (Prettier reformatted it).

6. **Playwright e2e uses preview server (port 4173)** — not the dev server. This avoids port conflicts when the dev server is already running during development. The `test:e2e` script in package.json still says `playwright test` — run it via `npx --no playwright test` or `./node_modules/.bin/playwright test` if `npx` picks up a global playwright.

### Project Structure (as of Session 1)

```
provisional-canvas/
├── .github/workflows/ci.yml     # CI pipeline
├── .husky/pre-commit             # lint-staged hook
├── .storybook/
│   ├── main.ts                   # Storybook config (addons, framework)
│   └── preview.ts                # Global decorators (dark mode, globals.css)
├── docs/
│   ├── mission.md                # Project vision & mission (sacred)
│   ├── product_experience.md     # UX design decisions (sacred)
│   ├── uiux_direction.md         # Visual/interaction direction (sacred)
│   └── superpowers/
│       ├── plans/                # Brainstorming plans
│       └── specs/                # Design specs (tokens spec)
├── e2e/
│   └── smoke.spec.ts             # Playwright e2e smoke tests
├── src/
│   ├── components/ui/
│   │   └── button.tsx            # shadcn button (proof of pipeline)
│   ├── hooks/                    # (empty, ready for hooks)
│   ├── lib/
│   │   └── utils.ts              # cn() utility for tailwind class merging
│   ├── stories/
│   │   └── DesignTokens.stories.tsx  # Visual token reference
│   ├── styles/
│   │   └── globals.css           # ALL design tokens live here
│   ├── test/
│   │   └── setup.ts              # Vitest setup (jest-dom matchers)
│   ├── App.test.tsx              # Unit smoke test
│   ├── App.tsx                   # Minimal app shell
│   ├── main.tsx                  # App entry point
│   └── vite-env.d.ts             # Vite client types
├── .mcp.json                     # MCP servers (shadcn + storybook)
├── .npmrc                        # legacy-peer-deps=true
├── .prettierrc / .prettierignore # Prettier config
├── components.json               # shadcn config
├── eslint.config.js              # ESLint flat config
├── index.html                    # Entry HTML (Google Fonts loaded here)
├── package.json                  # Scripts, deps, lint-staged config
├── playwright.config.ts          # Playwright e2e config
├── tsconfig.json                 # TS project references root
├── tsconfig.app.json             # TS config for src/
├── tsconfig.node.json            # TS config for config files
├── vite.config.ts                # Vite + Tailwind + Vitest projects
└── vitest.shims.d.ts             # Storybook vitest shims
```

### Key Commands

| Command                               | What it does                      |
| ------------------------------------- | --------------------------------- |
| `npm run dev`                         | Start Vite dev server (port 5173) |
| `npm run storybook`                   | Start Storybook (port 6006)       |
| `npm run build`                       | Type check + production build     |
| `npm run build-storybook`             | Build static Storybook            |
| `npm run lint`                        | Run ESLint                        |
| `npm run format:check`                | Check Prettier formatting         |
| `npm run test:run`                    | Run unit tests (Vitest)           |
| `./node_modules/.bin/playwright test` | Run e2e tests                     |
| `npx shadcn@latest add <component>`   | Add a shadcn component            |

### Docs Hierarchy (for conflicts)

1. `uiux_direction.md` — precedence for visual/interaction specifics
2. `product_experience.md` — authoritative for emotional intent and personality
3. `mission.md` — north star for all decisions

If docs conflict, flag it to the user. Don't silently pick a side.
