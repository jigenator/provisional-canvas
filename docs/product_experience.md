# Product Experience

## Target Audience Empathy

The primary audience is anyone orchestrating multiple AI agents — indie hackers, knowledge workers, creative professionals, AI practitioners. A broad audience unified by a single pain point: there is no single place where all agent conversations flow naturally.

Users arrive overwhelmed and frustrated. They're drowning in scattered terminals, tabs, and chat windows. They've tried multiplexers (blind to what's happening inside agents), switching between individual apps (constant context-switching), custom scripts (brittle and exhausting), and all-in-one AI IDEs (locked into one way of working). Nothing gives them flow across agents. Technical sophistication ranges from terminal natives to GUI-oriented users, but the feeling is universal: "I just want to get stuff done."

Success, ranked: everything flows into one inbox → seamless movement between agents → the canvas molds to how they think → never losing track of what's happening.

Usage pattern is all-day ambient presence. The canvas is always open, shifting fluidly between passive monitoring and deep focused sessions within a particular inbox item. The canvas surfaces what needs attention; the user responds.

Secondary audiences include plugin and theme creators who extend the canvas for others. Team collaboration is a future goal — personal-first. Extensibility via plugins, theming, and customization is core. Each user molds the canvas into something uniquely theirs.

## Emotional Design

The dominant emotion during use is calm control meeting effortless clarity. A quiet cockpit with a clean desk — you see what matters, you know what to pick up next, no noise.

The first 10 seconds should simultaneously feel simple ("oh, this isn't complex"), welcoming ("this feels like mine already"), and spatially clear ("I see where everything goes").

Completion moments carry quiet satisfaction flowing into momentum — subtle acknowledgment, then natural guidance to what's next. Agents don't disappear after being handled; they remain visible in a running state so the user always knows work is happening.

Error and failure states are met with calm reassurance and proactive guidance. No alarm, no drama — "this happened, here's what you can do."

Waiting is layered. The default is patient confidence — a simple indicator that the agent is working. The canvas gently nudges toward other inbox items so the user stays productive. On demand (clicking into the inbox item), transparent detailed progress is available — live logs, status, the full picture. Calm surface → productive redirection → depth on demand. The user controls how deep they go.

The emotional arc over a session is steady and even. The canvas never escalates with volume — it stays composed and helps prioritize. Quick-response items with long runtimes go first (get them running), then deeper engagement items. If users want urgency-based theming, that's a plugin choice, not a default.

No emotional boundaries are imposed. The canvas is calm and steady by nature, not by guardrail. Plugins can add any emotional layer — celebration, urgency, gamification.

Reference experiences: Superhuman's inbox flow for moving through agents in a flow state, combined with Notion's blocks system for customizing what each agent's space looks like. Flow state through the inbox, creative freedom within each item. Two UX concepts working together to eliminate the thousand-window problem.

## Personality & Voice

The tone is warm-professional with technical confidence. Human-readable lead, technical detail alongside. Never cold, never chatty. Respects the user's intelligence without demanding they parse jargon.

Examples:

- Agent error: "Agent exited unexpectedly — exit code 1. Restart?"
- Waiting: "Running — 3 tasks queued, ~2 min remaining"
- Empty inbox: "All clear — 0 items need attention"
- Onboarding: "Get started — connect your first agent"
- Completion: "Done — 247 tokens, 12s runtime"

The canvas uses neutral/implied address by default during core use ("3 items need attention", "Inbox clear"). Direct "you" appears only during onboarding, guidance, and recovery moments — when the user needs a guiding hand.

Verbosity is concise by default, but not afraid of explanation when genuinely needed. A line when a line will do, a paragraph when it won't.

Uncertainty is handled in layers: brief indicator first, escalate to detail if it persists. Don't hide issues, don't cry wolf over transient blips.

Tone shifts are subtle, not dramatic. Slightly warmer during onboarding, slightly more direct during errors — the same underlying voice throughout.

The canvas never uses: cutesy or playful language, corporate or marketing upsell copy, passive-aggressive remarks. These are hard lines.

## Interaction Behavior

User input is never blocked — actions register instantly. Visual feedback (fading, transitions, settling) is fluid and graceful, but always after control has returned to the user. The user is already on the next thing; the canvas catches up behind them.

Onboarding is guided, then invisible. The canvas walks you through it, then steps back and trusts you.

Confirmation scales with irreversibility and blast radius. Stopping an agent mid-task — no confirmation needed (restart it). Clearing the entire inbox or deleting a plugin — confirm first. Recoverable actions just happen.

Keyboard-first, mouse-friendly. Every action is reachable by keyboard for flow-state navigation, but nothing is keyboard-only. Mouse is always a valid path.

Notifications are in-canvas only. No system or OS-level notifications — that's plugin territory. The canvas is always-open and ambient; it doesn't chase the user outside of itself.

The spatial model has four zones:

- **Left persistent panel** (collapsible) — user-customizable blocks to the left of the inbox sidebar. Persists across inbox item changes.
- **Inbox sidebar** (collapsible) — inbox items list. Navigable by hotkey — collapsing it doesn't break keyboard flow.
- **Agent workspace** (main area) — blocks reconfigure based on the active inbox item's agent type. The dynamic zone.
- **Bottom persistent panel** (collapsible) — user-customizable blocks below the agent workspace. Persists across inbox item changes.

Power users can collapse all panels and flow purely via hotkeys with the agent workspace in full focus.

Animations follow the established philosophy: fluid visual transitions that never block user action. The canvas animates and breathes after control has passed back to the user.

Defaults don't assume for the user. The inbox sorts by a transparent, defined priority system (status categories, oldest first within each), but the canvas never reorders or prioritizes beyond this system without the user's explicit say.

Error recovery is layered: auto-retry transient failures silently (network blips, timeouts). Persistent or unrecoverable issues get surfaced with suggested fixes. The canvas handles the noise and escalates the real problems.

## Visual Direction Signals

The UI shell (borders, headers, toolbars, panel controls, scrollbars) is slim and minimal, maximizing space for content. The inbox sidebar is dense but scannable — many items visible at a glance. Overall spatial feeling is largely user-determined through block arrangement; the canvas provides a compact frame, the user fills it.

Blocks live in three zones: left persistent panel, agent workspace, and bottom persistent panel. The inbox sidebar is a fixed structural element, not a block zone. Block defaults use balanced padding and spacing — enough breathing room for calm readability, but each block earns its space without waste. The underlying grid and spacing system ensures blocks remain clean and readable even at maximum density.

Two color modes:

- **Light mode** — creamy, cozy warmth. Soft creams, warm off-whites, gentle tones. Cozy game aesthetic.
- **Dark mode** — moderate darkness at Mac terminal level. Dark gray, not true black. Softer contrast, comfortable for extended all-day use.

Both modes use color freely for small elements — status indicators, agent states, badges, active highlights. Color serves as information across a purposeful palette, not decoration.

Typography is mixed: a clean sans-serif with slight warmth (DM Sans or Plus Jakarta Sans direction) for UI elements, monospace for agent and technical content. One typeface system across both modes. Theming can override.

Shape language is subtly rounded, consistently across both modes. Slight border radius that softens without being bubbly — professional but not cold. Light and dark modes differ in color and warmth, not in shape.

The canvas's structural design (grid, spacing, borders) must hold up gracefully regardless of how much the user packs into customizable zones — clean and readable like Notion at any density.

Visual anti-goals: sterile or corporate aesthetic is avoided at all costs. Overwhelming color saturation on the base UI is avoided — purposeful color everywhere it's useful, but not color for color's sake across every surface. Clutter or emptiness in customizable areas is the user's prerogative, not a canvas failure.

## User Journey Feelings

All discovery channels matter — word of mouth, hitting a breaking point, seeing it in action — but the aspiration is a product so good that users share it organically.

Onboarding has two phases. First, a guided tour that walks through the spatial model, inbox flow, and hotkeys. Second, a setup wizard that asks about the user's agents and workflow, then recommends a starting block configuration. After that, the canvas steps back and trusts the user.

Aha moments build in sequence: keyboard flow speed ("this is fast") → workspace reconfiguring per agent ("it knows what I need") → first block customization ("I can make this mine") → first inbox notification from an agent ("they come to me, I don't chase them"). Each one deepens commitment.

Returning after absence: state is preserved exactly as left, plus a catch-up summary of what happened while the user was away. No disorientation.

Monetization is not in scope. Leaving and churning are not a current concern — the focus is on making the product too good to leave.

Edge cases:

- **Slow or degraded connection:** Honest and calm. Indicate which agents are slow without changing the overall feel or redirecting the user. The canvas stays steady and informational.
- **Empty canvas with no agents connected:** Warm but actionable. Feels like a beginning, not a void. Clear next step to connect the first agent.
- **Inbox piling up:** Neutral. Show the count, no judgment, no nagging. It's the user's pace.

## Anti-Goals

The canvas must never feel like Jira (bureaucratic, making simple things complex) or Slack (notification-heavy, anxiety-inducing, constantly demanding attention).

It must never create confusion (not knowing where you are or what just happened), distrust (the canvas doing something unexpected behind your back), or guilt (feeling bad for not using it "right" or often enough).

It must never use cutesy or playful language, corporate or marketing upsell copy, or passive-aggressive remarks.

It must never employ dark patterns, unskippable flows, or hidden state changes.

Visually, it must never look sterile or corporate. It must not have overwhelming color saturation on the base UI — purposeful color is encouraged, color for color's sake is not.

If a user ever says any of the following, the product has failed:

- "It looks nice, but it's slow" — aesthetics were prioritized over performance.
- "I came back and have no idea what happened while I was gone" — context recovery is broken.
- "I still need to switch between tabs and windows to manage my agents" — the inbox single-flow promise is broken.
