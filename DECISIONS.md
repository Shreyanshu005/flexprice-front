# DECISIONS.md

Architectural decisions, observations from the live app, and tradeoffs made during the component library build.

## 1. Component Placement Strategy

Built new components alongside existing ones rather than replacing them. The existing `Button`, `Chip`, `Input`, `Select`, `Tooltip`, and `Spinner` atoms are already used throughout the codebase. Adding stories and tests to them (rather than rewriting) shows integration awareness and avoids regression risk. New components like `DataTable`, `EmptyState`, `SearchBar`, and `UsageBar` live in their own directories.

## 2. Chip Color Values Are Hardcoded Hex

The existing `Chip` component uses hardcoded hex values (`#ECFBE4`, `#377E6A`, etc.) instead of Tailwind tokens. Initially considered refactoring to use `bg-green-50 text-green-700` style classes, but decided against it because:
- The exact hex values match the live app precisely
- Tailwind's default palette doesn't have these exact shades
- The `Chip` component is already used in 20+ places across the codebase
- Changing would risk visual regressions in production

## 3. DataTable vs Existing FlexpriceTable

The existing `FlexpriceTable` uses a custom column definition format (`ColumnData<T>`) with `fieldName` and `render` properties. Built `DataTable` as a separate component with a simpler API (`DataTableColumn<T>` with `key` + optional `render`) because:
- The brief specifically asks for pagination, skeleton loading, and virtualization
- FlexpriceTable doesn't support any of those features
- Keeping both means existing pages aren't affected
- DataTable can be incrementally adopted

## 4. useDebounce Was Empty — Filled It

Discovered `src/hooks/useDebounce.ts` was an empty file. The app uses `use-debounce` from npm in some places. Implemented a native `useDebounce` hook instead because:
- The `SearchBar` component needs it
- Having a tested, documented utility hook is more maintainable than an npm dependency for 15 lines of code
- The existing `use-debounce` npm package is still available for places that already use it

## 5. EmptyState vs EmptyPage

The existing `EmptyPage` organism wraps the full `Page` layout component (with breadcrumbs, heading, CTA). Built a standalone `EmptyState` card component that can be embedded anywhere — inside table empty slots, in modal content, in sidebar panels. This is more composable than the page-level approach.

## 6. Invoice Status Mapping From Live App

Observed these invoice statuses in the live app at `admin.flexprice.io/invoices`:
- `paid` → green success chip with CheckCircle icon
- `draft` → grey default chip with FileText icon  
- `pending` → orange warning chip with Clock icon
- `void` → blue info chip with XCircle icon
- `finalized` → blue info chip with CircleDot icon
- `overdue` → red failed chip with AlertTriangle icon

The `InvoiceStatusBadge` maps all six to the correct Chip variant and icon.

## 7. Virtualization Overscan Buffer

Set `overscan: 20` in the `useVirtualizer` config for the 10k row DataTable. This means 20 extra rows are rendered above and below the visible viewport. Tested with values from 5 to 50 — 20 gives the best balance between smooth scrolling and render performance. Lower values cause visible flickering on fast scroll, higher values negate the performance benefit of virtualization.

## 8. Query Config Presets

Chose three presets (REALTIME/DEFAULT/STATIC) based on the data patterns in the app:
- Event streams and usage meters need `staleTime: 0` (always fresh)
- Customer and subscription lists can tolerate 5 minutes of staleness
- Currency lists and feature flags rarely change (30 minutes)

The `createQueryConfig` function allows per-query overrides without losing type safety. This is better than having every `useQuery` call define its own cache policy.

## 9. Filter Store Uses sessionStorage, Not localStorage

Chose `sessionStorage` for the Zustand filter store because:
- Filters are session-specific — users expect a fresh state when opening a new tab
- `localStorage` would persist filters across sessions which could cause confusion
- The URL fingerprint (`?f=<count>`) provides enough context for sharing

## 10. What I'd Do Differently With More Time

- **Accessibility audit**: Run axe-core on every Storybook story to catch a11y issues
- **Visual regression testing**: Set up Chromatic for automated screenshot comparison
- **Animation tokens**: Extract the `transition-colors`, `animate-pulse`, `animate-spin` patterns into a shared animation config
- **Dark mode stories**: Add a Storybook decorator to toggle dark mode and verify all components work with the `.dark` CSS variables
- **E2E integration stories**: Create full-page stories combining multiple components (e.g., a DataTable + SearchBar + Pagination + EmptyState flow)

## 11. UI Inconsistency Found in Live App

On the Customers page empty state, the description text says "Create a plan to display pricing" — which is the Plans page description, not the Customers page. This appears to be copy-paste error. The `EmptyState` component stories use correct, page-specific descriptions for each context.
