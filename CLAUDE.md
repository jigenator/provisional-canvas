# Component Architecture

- Three-layer architecture: `ui/` (shadcn, never modify) → `common/` (wrappers) → `layout/` (structural shell)
- All sizing values must be 4px multiples
- Design tokens live in `src/styles/globals.css` — use Tailwind utility classes (`bg-surface-1`, `text-fg-secondary`, etc.)
- shadcn components: `npx shadcn@latest add <name>`, never edit files in `ui/`
- Wrapper components in `src/components/common/` extend shadcn primitives with project-specific behavior
- Layout components in `src/components/layout/` are fully custom structural components
- Every component gets a Storybook story
- Icons via `lucide-react`
- Use `cn()` from `@/lib/utils` for conditional class merging

# Testing

- Test command: `npx vitest run --project=unit`
- Individual test: `npx vitest run src/path/file.test.tsx --project=unit`
- Build check: `npm run build`
- Tests colocated as `component-name.test.tsx` next to the component
- Stories in `src/stories/` mirroring the component directory structure
- Path alias: `@/*` → `src/*`
