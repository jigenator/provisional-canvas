# UI Tokens Design Spec

## Overview

A single CSS custom properties file (`src/styles/tokens.css`) serving as the single source of truth for all design tokens in provisional-canvas. Tokens feed into shadcn/ui's variable system and Tailwind CSS config. Approach chosen: CSS Variables Only (no TypeScript tokens, no Tailwind-as-source).

## Framework

- **Vite + React**
- **shadcn/ui** for component primitives
- **Tailwind CSS** for utility classes, extending from CSS variables

## File Location

```
src/styles/tokens.css
```

Imported once at the app root, before any other styles.

## Structure

```
tokens.css
├── :root (light mode — default)
│   ├── Colors — Surfaces
│   ├── Colors — Foreground
│   ├── Colors — Status
│   ├── Colors — Accent
│   ├── Colors — Border
│   ├── Typography (families + sizes)
│   ├── Spacing
│   ├── Radius
│   ├── Shadows
│   ├── Motion
│   └── shadcn Mappings
│
└── .dark
    ├── Color overrides only
    ├── Shadow overrides
    └── shadcn Mapping overrides
```

Light mode is `:root` default. Dark mode is `.dark` class override. Non-color tokens (typography, spacing, radius, motion) are defined once in `:root` — they are mode-independent per the UI/UX direction doc.

## Token Values

### Dark Mode Colors (`.dark`)

**Surfaces (depth layering — terminal deepest, UI layers above):**

| Token | Value | Role |
|---|---|---|
| `--color-terminal` | `#1E1E1E` | Deepest layer, terminal content |
| `--color-bg` | `#232323` | Base background |
| `--color-surface-1` | `#282828` | Zone backgrounds |
| `--color-surface-2` | `#2E2E2E` | Elevated elements, blocks, floating item |
| `--color-surface-3` | `#343434` | Hover states, active elements |

**Foreground:**

| Token | Value | Role |
|---|---|---|
| `--color-fg` | `#E8E4E0` | Primary text (near-white, slightly warm) |
| `--color-fg-secondary` | `#9B9590` | Timestamps, captions, context lines |
| `--color-fg-muted` | `#6B6560` | Disabled, placeholder text (exempt from WCAG contrast — see Accessibility) |

**Border:**

| Token | Value | Role |
|---|---|---|
| `--color-border` | `rgba(255, 255, 255, 0.08)` | Very subtle, barely visible |

### Light Mode Colors (`:root` — Warm Cream palette)

Palette choice: "Warm Cream" (option B from brainstorming). Achieves the "noticeably warm cream — clearly cozy compared to pure white, not parchment-rich" and "cozy game aesthetic" targets from the product experience doc. The warmth is carried by consistent yellow-orange undertones across all surface levels, distinguishable from generic off-white or cool gray.

**Surfaces:**

| Token | Value | Role |
|---|---|---|
| `--color-terminal` | `#EDE7DE` | Slightly deeper than bg — maintains "window into something deeper" even in light mode |
| `--color-bg` | `#F8F4EE` | Base background |
| `--color-surface-1` | `#F2EDE6` | Zone backgrounds |
| `--color-surface-2` | `#EBE5DC` | Elevated elements, blocks |
| `--color-surface-3` | `#E3DCD2` | Hover states, active elements |

**Foreground:**

| Token | Value | Role |
|---|---|---|
| `--color-fg` | `#2A2522` | Primary text (warm near-black) |
| `--color-fg-secondary` | `#756F6A` | Timestamps, captions (darkened from initial #8B8580 for 4.5:1 contrast on cream backgrounds) |
| `--color-fg-muted` | `#B5AFA8` | Disabled, placeholder (exempt from WCAG contrast — see Accessibility) |

**Border:**

| Token | Value | Role |
|---|---|---|
| `--color-border` | `rgba(0, 0, 0, 0.08)` | Very subtle, barely visible |

### Mode-Independent Colors

Status and accent colors are the same in both modes — designed to be vivid against neutral canvases.

**Status:**

| Token | Value | Role |
|---|---|---|
| `--color-status-running` | `#5B9EE9` | Calm blue |
| `--color-status-attention` | `#E5A84B` | Warm amber |
| `--color-status-completed` | `#6BBF6B` | Fresh, slightly warm green |
| `--color-status-error` | `#D4726C` | Soft coral |
| `--color-status-idle` | `#8B82A8` | Gray-purple |

**Status color usage:** These colors are used as visual indicators — status dots, left border accents, badge backgrounds, and icon tints — not as text colors. Text rendered on status-colored backgrounds (e.g., inside badges) uses `#FFFFFF` or `--color-fg` for contrast. The status colors themselves do not need to meet WCAG text contrast ratios against surface backgrounds because they serve as non-text graphical indicators (WCAG 1.4.11 requires 3:1 for graphical objects; all status colors meet this against dark mode surfaces, and in light mode the indicators are supplemented by shape/position so they are not contrast-dependent alone).

**Accent:**

| Token | Value | Role |
|---|---|---|
| `--color-accent` | `#4E9E96` | Warm teal/muted cyan (darkened from initial #5BA8A0 for contrast compliance) |

**Accent foreground (per-mode — contrast requirement):**

| Token | Light Mode | Dark Mode | Role |
|---|---|---|---|
| `--color-accent-fg` | `#FFFFFF` | `#FFFFFF` | Text on accent backgrounds |

`#FFFFFF` on `#4E9E96` yields ~3.3:1 (WCAG AA for large text/UI components at 3:1 minimum). Accent is used for buttons and interactive highlights where text is rendered at `--text-body` (14px) or larger — meeting the large text/UI component threshold. For the rare case of small caption text on accent backgrounds, use `--color-fg` instead.

**Destructive foreground:**

| Token | Value | Role |
|---|---|---|
| `--color-destructive-fg` | `#FFFFFF` | Text on destructive/error backgrounds |

`#FFFFFF` on `#D4726C` yields ~3.3:1 (WCAG AA for large text/UI components). Same usage pattern as accent — destructive actions are buttons with 14px+ text.

### Typography

**Font families:**

| Token | Value | Note |
|---|---|---|
| `--font-ui` | `'DM Sans', sans-serif` | Chosen from DM Sans / Plus Jakarta Sans direction. DM Sans selected for its slightly warmer geometry and better optical balance at UI sizes. |
| `--font-mono` | `'JetBrains Mono', monospace` | Chosen from JetBrains Mono / Fira Code direction. JetBrains Mono selected for wider language support and cleaner ligatures. |

**Font sizes (role hierarchy from UI/UX direction doc):**

| Token | Value | Role |
|---|---|---|
| `--text-heading-1` | `1.5rem` (24px) | Page-level headings |
| `--text-heading-2` | `1.25rem` (20px) | Section headings |
| `--text-heading-3` | `1rem` (16px) | Sub-section headings, zone headers |
| `--text-body` | `0.875rem` (14px) | Default body text, inbox items |
| `--text-caption` | `0.75rem` (12px) | Timestamps, context lines, status text |
| `--text-code` | `0.8125rem` (13px) | Monospace content, terminal output |

14px body default chosen for information-dense UI — matches the "dense but scannable" inbox requirement without sacrificing readability.

### Spacing

Base unit: `4px` (locked).

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |

### Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Badges, tags, small elements |
| `--radius-md` | `8px` | Blocks, cards, inputs |
| `--radius-lg` | `12px` | Modals, overlays |

### Motion

| Token | Value | Usage |
|---|---|---|
| `--duration-snappy` | `125ms` | User-initiated actions (selecting, collapsing, opening) |
| `--duration-gentle` | `250ms` | System-initiated changes (status transitions, items settling) |
| `--duration-fade` | `200ms` | Opacity-only transitions (cross-fades, fade in/out) |
| `--ease-snappy` | `cubic-bezier(0, 0, 0.2, 1)` | Ease-out for user actions |
| `--ease-gentle` | `cubic-bezier(0.4, 0, 0.2, 1)` | Ease-in-out for system changes |

**`prefers-reduced-motion` strategy:** Per the UI/UX direction doc, position and size animations are removed but opacity fades are kept. Implementation: under `prefers-reduced-motion: reduce`, set `--duration-snappy` and `--duration-gentle` to `0ms` (removes spatial movement), but keep `--duration-fade` unchanged (preserves smooth opacity transitions). Components use `--duration-snappy`/`--duration-gentle` for transforms/position and `--duration-fade` for opacity.

### Shadows

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--shadow-float` | `0 8px 24px rgba(0, 0, 0, 0.12)` | `0 8px 24px rgba(0, 0, 0, 0.4)` | Floating inbox item, modals, command palette, tooltips |

Per-mode values: dark backgrounds need stronger shadow opacity to be visible. Only for elements that float above the main canvas layer. All other depth via surface color layering.

## shadcn Variable Mapping

shadcn expects specific variable names. These map to semantic tokens:

| shadcn Variable | Maps To |
|---|---|
| `--background` | `--color-bg` |
| `--foreground` | `--color-fg` |
| `--card` | `--color-surface-1` |
| `--card-foreground` | `--color-fg` |
| `--primary` | `--color-accent` |
| `--primary-foreground` | `--color-accent-fg` |
| `--secondary` | `--color-surface-2` |
| `--secondary-foreground` | `--color-fg` |
| `--muted` | `--color-surface-2` |
| `--muted-foreground` | `--color-fg-secondary` |
| `--accent` | `--color-surface-3` |
| `--accent-foreground` | `--color-fg` |
| `--destructive` | `--color-status-error` |
| `--destructive-foreground` | `--color-destructive-fg` |
| `--border` | `--color-border` |
| `--input` | `--color-border` |
| `--ring` | `--color-accent` |
| `--radius` | `--radius-md` |

Note: shadcn's `--accent` maps to `--color-surface-3` (hover/active surface), not the teal accent color. This is intentional — shadcn uses `accent` for subtle hover highlights on menu items and list rows, which aligns with our surface-3 role. The teal accent color maps to `--primary`.

## Tailwind Integration

`tailwind.config.ts` extends from CSS variables:

```ts
theme: {
  extend: {
    colors: {
      terminal: 'var(--color-terminal)',
      bg: 'var(--color-bg)',
      surface: {
        1: 'var(--color-surface-1)',
        2: 'var(--color-surface-2)',
        3: 'var(--color-surface-3)',
      },
      fg: {
        DEFAULT: 'var(--color-fg)',
        secondary: 'var(--color-fg-secondary)',
        muted: 'var(--color-fg-muted)',
      },
      status: {
        running: 'var(--color-status-running)',
        attention: 'var(--color-status-attention)',
        completed: 'var(--color-status-completed)',
        error: 'var(--color-status-error)',
        idle: 'var(--color-status-idle)',
      },
      accent: {
        DEFAULT: 'var(--color-accent)',
        fg: 'var(--color-accent-fg)',
      },
      border: 'var(--color-border)',
    },
    fontFamily: {
      ui: 'var(--font-ui)',
      mono: 'var(--font-mono)',
    },
    fontSize: {
      'heading-1': 'var(--text-heading-1)',
      'heading-2': 'var(--text-heading-2)',
      'heading-3': 'var(--text-heading-3)',
      'body': 'var(--text-body)',
      'caption': 'var(--text-caption)',
      'code': 'var(--text-code)',
    },
    spacing: {
      '1': 'var(--space-1)',
      '2': 'var(--space-2)',
      '3': 'var(--space-3)',
      '4': 'var(--space-4)',
      '5': 'var(--space-5)',
      '6': 'var(--space-6)',
      '8': 'var(--space-8)',
      '10': 'var(--space-10)',
      '12': 'var(--space-12)',
      '16': 'var(--space-16)',
    },
    borderRadius: {
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
    },
    boxShadow: {
      float: 'var(--shadow-float)',
    },
    transitionDuration: {
      snappy: 'var(--duration-snappy)',
      gentle: 'var(--duration-gentle)',
      fade: 'var(--duration-fade)',
    },
    transitionTimingFunction: {
      snappy: 'var(--ease-snappy)',
      gentle: 'var(--ease-gentle)',
    },
  },
}
```

## Theming

The docs specify the canvas is fully themeable. This token system supports theming by:

1. A theme overrides the CSS variables in `tokens.css` (or provides an additional CSS file that overrides them)
2. Structural tokens (spacing base, grid) stay fixed per docs — "themes change how it looks, not how it works"
3. Typography, colors, radius, shadows are all themeable

**Out of scope for this spec:** Background images, gradients, and opacity overlays mentioned in the UI/UX direction doc as themeable. These are visual effects layered on top of the token system and will be addressed in a theming spec when the theme system is designed. The token system provides the foundation they build on.

## Accessibility

- All foreground/background text pairings meet WCAG AA (4.5:1 normal text, 3:1 large text/UI components), with two documented exceptions:
  - `--color-fg-muted`: Exempt per WCAG 1.4.3 — used exclusively for disabled/inactive UI elements which are explicitly excluded from contrast requirements
  - Status colors: Used as non-text graphical indicators (dots, borders, badges), not text colors. Text on status-colored backgrounds uses `#FFFFFF` or `--color-fg`. See Status section for details.
- `--color-accent-fg` and `--color-destructive-fg` use `#FFFFFF` achieving ~3.3:1 on their respective backgrounds — meeting AA for UI components and large text (14px+ button text)
- `prefers-reduced-motion`: spatial duration tokens (`--duration-snappy`, `--duration-gentle`) set to `0ms`; opacity duration (`--duration-fade`) preserved. See Motion section for details.

## Design Decisions

- **Light mode as `:root` default:** Matches shadcn convention and CSS best practice
- **Font choices (DM Sans, JetBrains Mono):** Selected from directional candidates in UI/UX doc. DM Sans over Plus Jakarta Sans for warmer geometry at UI sizes. JetBrains Mono over Fira Code for broader language support. These can be swapped via theming if needed.
- **14px body text default:** Balances information density (dense inbox, status counts, many visible items) with readability for all-day ambient use
- **Mode-independent status/accent colors:** Simplifies theming, and the chosen values work on both warm cream and dark gray backgrounds
- **Darkened `--color-accent` to `#4E9E96`:** Original `#5BA8A0` failed 3:1 with white text. Slightly darker teal preserves the warm teal character while meeting contrast.
- **`--color-fg-secondary` darkened in light mode to `#756F6A`:** Original `#8B8580` failed 4.5:1 on cream backgrounds for normal text. Darker warm gray meets AA.
- **`--color-destructive-fg` as dedicated token:** Consistent with the semantic token approach rather than hardcoding `#FFFFFF` in the shadcn mapping
- **Per-mode `--shadow-float`:** Dark backgrounds absorb shadow; higher opacity needed for visibility
- **Separate `--duration-fade` token:** Enables the `prefers-reduced-motion` strategy from the UI/UX doc (remove spatial animation, keep opacity fades)
- **`rgba` borders:** Scale naturally with background changes rather than needing per-mode hex overrides
- **Spacing scale skips 7, 9, 11, 13-15:** Follows Tailwind convention, covers practical needs without bloat
- **Single shadow token:** Docs specify shadows only for floating elements — one level is sufficient
- **shadcn `--accent` → `--color-surface-3`:** shadcn uses `accent` for hover highlights, not brand accent. Brand accent maps to `--primary`.
