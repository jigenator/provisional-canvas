# UI Tokens Design Spec

## Overview

A single `globals.css` file serving as the single source of truth for all design tokens in provisional-canvas. Follows shadcn/ui v4 conventions: CSS custom properties in `:root`/`.dark` blocks, registered with Tailwind v4 via `@theme inline` directives. No separate `tailwind.config.ts` theme extension needed.

## Framework

- **Vite + React**
- **shadcn/ui v4** for component primitives
- **Tailwind CSS v4** with `@theme inline` for utility class registration

## File Location

```
src/styles/globals.css
```

This is the file shadcn's `components.json` points to via `"tailwind.css"`. Imported once at the app root.

## Structure

```
globals.css
├── @import "tailwindcss"
├── @import "tw-animate-css"
├── @import "shadcn/tailwind.css"
├── @custom-variant dark (&:is(.dark *))
│
├── @theme inline
│   ├── shadcn color registrations (--color-background, --color-primary, etc.)
│   ├── Custom color registrations (--color-terminal, --color-surface-*, --color-status-*, etc.)
│   ├── Custom font registrations (--font-ui, --font-mono)
│   ├── Custom spacing registrations (--spacing-*)
│   ├── Radius registrations (--radius-*)
│   └── Custom utility registrations (shadow, duration, easing)
│
├── :root (light mode — default)
│   ├── shadcn variables (--background, --foreground, --primary, etc.)
│   ├── Custom variables (--terminal, --surface-*, --fg-*, --status-*, etc.)
│   ├── Typography, spacing, radius, shadow, motion
│
├── .dark
│   ├── Color overrides only
│   └── Shadow overrides
│
└── @layer base
    └── Default body styles
```

Light mode is `:root` default. Dark mode is `.dark` class override via `@custom-variant`. Non-color tokens (typography, spacing, radius, motion) are defined once in `:root` — they are mode-independent per the UI/UX direction doc.

**Key convention:** shadcn variables use bare names (`--background`, `--primary`). Custom project variables use prefixed names (`--terminal`, `--surface-1`, `--status-running`). The `@theme inline` block registers both for Tailwind utility class access via the `--color-*` namespace.

## Token Values

### Dark Mode Colors (`.dark`)

**Surfaces (depth layering — terminal deepest, UI layers above):**

| Token          | Value     | Role                                     |
| -------------- | --------- | ---------------------------------------- |
| `--terminal`   | `#1E1E1E` | Deepest layer, terminal content          |
| `--background` | `#232323` | Base background (shadcn)                 |
| `--surface-1`  | `#282828` | Zone backgrounds                         |
| `--surface-2`  | `#2E2E2E` | Elevated elements, blocks, floating item |
| `--surface-3`  | `#343434` | Hover states, active elements            |

**Foreground:**

| Token            | Value     | Role                                                                       |
| ---------------- | --------- | -------------------------------------------------------------------------- |
| `--foreground`   | `#E8E4E0` | Primary text (shadcn)                                                      |
| `--fg-secondary` | `#9B9590` | Timestamps, captions, context lines                                        |
| `--fg-muted`     | `#6B6560` | Disabled, placeholder text (exempt from WCAG contrast — see Accessibility) |

**Border:**

| Token      | Value                       | Role                                 |
| ---------- | --------------------------- | ------------------------------------ |
| `--border` | `rgba(255, 255, 255, 0.08)` | Very subtle, barely visible (shadcn) |

### Light Mode Colors (`:root` — Warm Cream palette)

Palette choice: "Warm Cream" (option B from brainstorming). Achieves the "noticeably warm cream — clearly cozy compared to pure white, not parchment-rich" and "cozy game aesthetic" targets from the product experience doc. The warmth is carried by consistent yellow-orange undertones across all surface levels, distinguishable from generic off-white or cool gray.

**Surfaces:**

| Token          | Value     | Role                                                                                  |
| -------------- | --------- | ------------------------------------------------------------------------------------- |
| `--terminal`   | `#EDE7DE` | Slightly deeper than bg — maintains "window into something deeper" even in light mode |
| `--background` | `#F8F4EE` | Base background (shadcn)                                                              |
| `--surface-1`  | `#F2EDE6` | Zone backgrounds                                                                      |
| `--surface-2`  | `#EBE5DC` | Elevated elements, blocks                                                             |
| `--surface-3`  | `#E3DCD2` | Hover states, active elements                                                         |

**Foreground:**

| Token            | Value     | Role                                                                                         |
| ---------------- | --------- | -------------------------------------------------------------------------------------------- |
| `--foreground`   | `#2A2522` | Primary text (shadcn)                                                                        |
| `--fg-secondary` | `#756F6A` | Timestamps, captions (darkened from initial #8B8580 for 4.5:1 contrast on cream backgrounds) |
| `--fg-muted`     | `#B5AFA8` | Disabled, placeholder (exempt from WCAG contrast — see Accessibility)                        |

**Border:**

| Token      | Value                 | Role                                 |
| ---------- | --------------------- | ------------------------------------ |
| `--border` | `rgba(0, 0, 0, 0.08)` | Very subtle, barely visible (shadcn) |

### Mode-Independent Colors

Status and accent colors are the same in both modes — designed to be vivid against neutral canvases.

**Status:**

| Token                | Value     | Role                       |
| -------------------- | --------- | -------------------------- |
| `--status-running`   | `#5B9EE9` | Calm blue                  |
| `--status-attention` | `#E5A84B` | Warm amber                 |
| `--status-completed` | `#6BBF6B` | Fresh, slightly warm green |
| `--status-error`     | `#D4726C` | Soft coral                 |
| `--status-idle`      | `#8B82A8` | Gray-purple                |

**Status color usage:** These colors are used as visual indicators — status dots, left border accents, badge backgrounds, and icon tints — not as text colors. Text rendered on status-colored backgrounds (e.g., inside badges) uses `#FFFFFF` or `--foreground` for contrast. The status colors themselves do not need to meet WCAG text contrast ratios against surface backgrounds because they serve as non-text graphical indicators (WCAG 1.4.11 requires 3:1 for graphical objects; all status colors meet this against dark mode surfaces, and in light mode the indicators are supplemented by shape/position so they are not contrast-dependent alone).

**Accent / Primary:**

| Token                  | Value     | Role                                                                                             |
| ---------------------- | --------- | ------------------------------------------------------------------------------------------------ |
| `--primary`            | `#4E9E96` | Warm teal/muted cyan (shadcn `--primary`, darkened from initial #5BA8A0 for contrast compliance) |
| `--primary-foreground` | `#FFFFFF` | Text on primary/accent backgrounds (shadcn)                                                      |

`#FFFFFF` on `#4E9E96` yields ~3.3:1 (WCAG AA for large text/UI components at 3:1 minimum). Primary/accent is used for buttons and interactive highlights where text is rendered at `--text-body` (14px) or larger — meeting the large text/UI component threshold. For the rare case of small caption text on accent backgrounds, use `--foreground` instead.

**Destructive:**

| Token                      | Value     | Role                                          |
| -------------------------- | --------- | --------------------------------------------- |
| `--destructive`            | `#D4726C` | Soft coral (shadcn, same as `--status-error`) |
| `--destructive-foreground` | `#FFFFFF` | Text on destructive backgrounds (shadcn)      |

`#FFFFFF` on `#D4726C` yields ~3.3:1 (WCAG AA for large text/UI components). Same usage pattern as primary — destructive actions are buttons with 14px+ text.

### shadcn Derived Variables

These are set in both `:root` and `.dark` to complete shadcn's expected variable set. Values reference the semantic tokens above.

| Token                    | Light Mode Value         | Dark Mode Value          | Role                        |
| ------------------------ | ------------------------ | ------------------------ | --------------------------- |
| `--card`                 | = `--surface-1` value    | = `--surface-1` value    | Card backgrounds            |
| `--card-foreground`      | = `--foreground` value   | = `--foreground` value   | Card text                   |
| `--popover`              | = `--surface-1` value    | = `--surface-1` value    | Popover backgrounds         |
| `--popover-foreground`   | = `--foreground` value   | = `--foreground` value   | Popover text                |
| `--secondary`            | = `--surface-2` value    | = `--surface-2` value    | Secondary backgrounds       |
| `--secondary-foreground` | = `--foreground` value   | = `--foreground` value   | Secondary text              |
| `--muted`                | = `--surface-2` value    | = `--surface-2` value    | Muted backgrounds           |
| `--muted-foreground`     | = `--fg-secondary` value | = `--fg-secondary` value | Muted text                  |
| `--accent`               | = `--surface-3` value    | = `--surface-3` value    | Hover highlight backgrounds |
| `--accent-foreground`    | = `--foreground` value   | = `--foreground` value   | Hover highlight text        |
| `--input`                | = `--border` value       | = `--border` value       | Input borders               |
| `--ring`                 | = `--primary` value      | = `--primary` value      | Focus rings                 |

Note: shadcn's `--accent` maps to `--surface-3` (hover/active surface), not the teal accent color. This is intentional — shadcn uses `accent` for subtle hover highlights on menu items and list rows, which aligns with our surface-3 role. The teal accent color maps to `--primary`.

### Typography

**Font families:**

| Token         | Value                         | Note                                                                                                                                         |
| ------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `--font-ui`   | `'DM Sans', sans-serif`       | Chosen from DM Sans / Plus Jakarta Sans direction. DM Sans selected for its slightly warmer geometry and better optical balance at UI sizes. |
| `--font-mono` | `'JetBrains Mono', monospace` | Chosen from JetBrains Mono / Fira Code direction. JetBrains Mono selected for wider language support and cleaner ligatures.                  |

**Font sizes (role hierarchy from UI/UX direction doc):**

| Token              | Value              | Role                                   |
| ------------------ | ------------------ | -------------------------------------- |
| `--text-heading-1` | `1.5rem` (24px)    | Page-level headings                    |
| `--text-heading-2` | `1.25rem` (20px)   | Section headings                       |
| `--text-heading-3` | `1rem` (16px)      | Sub-section headings, zone headers     |
| `--text-body`      | `0.875rem` (14px)  | Default body text, inbox items         |
| `--text-caption`   | `0.75rem` (12px)   | Timestamps, context lines, status text |
| `--text-code`      | `0.8125rem` (13px) | Monospace content, terminal output     |

14px body default chosen for information-dense UI — matches the "dense but scannable" inbox requirement without sacrificing readability.

### Spacing

Base unit: `4px` (locked).

| Token        | Value  |
| ------------ | ------ |
| `--space-1`  | `4px`  |
| `--space-2`  | `8px`  |
| `--space-3`  | `12px` |
| `--space-4`  | `16px` |
| `--space-5`  | `20px` |
| `--space-6`  | `24px` |
| `--space-8`  | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |

### Radius

shadcn v4 uses a single `--radius` base with calculated variants. We set the base and let shadcn derive the scale:

| Token      | Value          | Note                                                                  |
| ---------- | -------------- | --------------------------------------------------------------------- |
| `--radius` | `0.5rem` (8px) | Base radius — shadcn derives sm/md/lg/xl/2xl via `calc()` multipliers |

shadcn's derived scale from `--radius: 0.5rem`:

- `--radius-sm`: `calc(0.5rem * 0.6)` = 4.8px (badges, tags)
- `--radius-md`: `calc(0.5rem * 0.8)` = 6.4px (inputs)
- `--radius-lg`: `0.5rem` = 8px (cards, blocks)
- `--radius-xl`: `calc(0.5rem * 1.4)` = 11.2px (modals, overlays)

This aligns with our target: ~4px small, ~8px blocks/cards, ~12px modals.

### Motion

| Token               | Value                          | Usage                                                         |
| ------------------- | ------------------------------ | ------------------------------------------------------------- |
| `--duration-snappy` | `125ms`                        | User-initiated actions (selecting, collapsing, opening)       |
| `--duration-gentle` | `250ms`                        | System-initiated changes (status transitions, items settling) |
| `--duration-fade`   | `200ms`                        | Opacity-only transitions (cross-fades, fade in/out)           |
| `--ease-snappy`     | `cubic-bezier(0, 0, 0.2, 1)`   | Ease-out for user actions                                     |
| `--ease-gentle`     | `cubic-bezier(0.4, 0, 0.2, 1)` | Ease-in-out for system changes                                |

**`prefers-reduced-motion` strategy:** Per the UI/UX direction doc, position and size animations are removed but opacity fades are kept. Implementation: under `prefers-reduced-motion: reduce`, set `--duration-snappy` and `--duration-gentle` to `0ms` (removes spatial movement), but keep `--duration-fade` unchanged (preserves smooth opacity transitions). Components use `--duration-snappy`/`--duration-gentle` for transforms/position and `--duration-fade` for opacity.

### Shadows

| Token            | Light Mode                       | Dark Mode                       | Usage                                                  |
| ---------------- | -------------------------------- | ------------------------------- | ------------------------------------------------------ |
| `--shadow-float` | `0 8px 24px rgba(0, 0, 0, 0.12)` | `0 8px 24px rgba(0, 0, 0, 0.4)` | Floating inbox item, modals, command palette, tooltips |

Per-mode values: dark backgrounds need stronger shadow opacity to be visible. Only for elements that float above the main canvas layer. All other depth via surface color layering.

## Tailwind v4 Integration (`@theme inline`)

Instead of a `tailwind.config.ts`, all custom utilities are registered via `@theme inline` in `globals.css`. This block maps CSS variables to Tailwind's utility namespace:

```css
@theme inline {
  /* shadcn standard colors (required) */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  /* Custom project colors */
  --color-terminal: var(--terminal);
  --color-surface-1: var(--surface-1);
  --color-surface-2: var(--surface-2);
  --color-surface-3: var(--surface-3);
  --color-fg-secondary: var(--fg-secondary);
  --color-fg-muted: var(--fg-muted);
  --color-status-running: var(--status-running);
  --color-status-attention: var(--status-attention);
  --color-status-completed: var(--status-completed);
  --color-status-error: var(--status-error);
  --color-status-idle: var(--status-idle);

  /* Radius — shadcn derives scale from --radius */
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);

  /* Typography */
  --font-ui: var(--font-ui);
  --font-mono: var(--font-mono);

  /* Custom spacing */
  --spacing-1: var(--space-1);
  --spacing-2: var(--space-2);
  --spacing-3: var(--space-3);
  --spacing-4: var(--space-4);
  --spacing-5: var(--space-5);
  --spacing-6: var(--space-6);
  --spacing-8: var(--space-8);
  --spacing-10: var(--space-10);
  --spacing-12: var(--space-12);
  --spacing-16: var(--space-16);
}
```

This enables Tailwind utility classes like `bg-terminal`, `text-fg-secondary`, `text-status-running`, `bg-surface-1`, `rounded-lg`, `font-ui`, `p-4`, etc.

## Base Layer

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-ui text-body;
  }
}
```

## Theming

The docs specify the canvas is fully themeable. This token system supports theming by:

1. A theme provides a CSS file that overrides the variables in `:root` and `.dark` blocks
2. Structural tokens (spacing base, grid) stay fixed per docs — "themes change how it looks, not how it works"
3. Typography, colors, radius, shadows are all themeable

**Out of scope for this spec:** Background images, gradients, and opacity overlays mentioned in the UI/UX direction doc as themeable. These are visual effects layered on top of the token system and will be addressed in a theming spec when the theme system is designed. The token system provides the foundation they build on.

## Accessibility

- All foreground/background text pairings meet WCAG AA (4.5:1 normal text, 3:1 large text/UI components), with two documented exceptions:
  - `--fg-muted`: Exempt per WCAG 1.4.3 — used exclusively for disabled/inactive UI elements which are explicitly excluded from contrast requirements
  - Status colors: Used as non-text graphical indicators (dots, borders, badges), not text colors. Text on status-colored backgrounds uses `#FFFFFF` or `--foreground`. See Status section for details.
- `--primary-foreground` and `--destructive-foreground` use `#FFFFFF` achieving ~3.3:1 on their respective backgrounds — meeting AA for UI components and large text (14px+ button text)
- `prefers-reduced-motion`: spatial duration tokens (`--duration-snappy`, `--duration-gentle`) set to `0ms`; opacity duration (`--duration-fade`) preserved. See Motion section for details.

## Design Decisions

- **`globals.css` instead of `tokens.css`:** Follows shadcn v4 convention — all CSS variables and `@theme inline` registrations live in the global CSS file. No separate token file needed.
- **Tailwind v4 `@theme inline` instead of `tailwind.config.ts`:** shadcn v4 convention. Variables are registered directly in CSS, eliminating the config file for theme extension.
- **shadcn variable names as primary:** Instead of custom `--color-bg` / `--color-fg` names mapped to shadcn, we use shadcn's native names (`--background`, `--foreground`, `--primary`, etc.) directly. Custom tokens (`--terminal`, `--surface-*`, `--status-*`, `--fg-secondary`, `--fg-muted`) extend beyond shadcn's set.
- **Single `--radius` base:** shadcn v4 derives its entire radius scale from one base value via `calc()` multipliers. We set `--radius: 0.5rem` (8px) and let the scale generate naturally, aligning with our target values.
- **Light mode as `:root` default:** Matches shadcn convention and CSS best practice
- **Font choices (DM Sans, JetBrains Mono):** Selected from directional candidates in UI/UX doc. DM Sans over Plus Jakarta Sans for warmer geometry at UI sizes. JetBrains Mono over Fira Code for broader language support. These can be swapped via theming if needed.
- **14px body text default:** Balances information density (dense inbox, status counts, many visible items) with readability for all-day ambient use
- **Mode-independent status colors:** Simplifies theming, and the chosen values work on both warm cream and dark gray backgrounds
- **Darkened `--primary` to `#4E9E96`:** Original `#5BA8A0` failed 3:1 with white text. Slightly darker teal preserves the warm teal character while meeting contrast.
- **`--fg-secondary` darkened in light mode to `#756F6A`:** Original `#8B8580` failed 4.5:1 on cream backgrounds for normal text. Darker warm gray meets AA.
- **Per-mode `--shadow-float`:** Dark backgrounds absorb shadow; higher opacity needed for visibility
- **Separate `--duration-fade` token:** Enables the `prefers-reduced-motion` strategy from the UI/UX doc (remove spatial animation, keep opacity fades)
- **`rgba` borders:** Scale naturally with background changes rather than needing per-mode hex overrides
- **Spacing scale skips 7, 9, 11, 13-15:** Follows Tailwind convention, covers practical needs without bloat
- **shadcn `--accent` → `--surface-3`:** shadcn uses `accent` for hover highlights, not brand accent. Brand accent maps to `--primary`.
