# DECISIONS.md

Architectural decisions, observations from the live app, and tradeoffs made during the component library build.

## 1. Component Placement Strategy

Built new components alongside existing ones rather than replacing them. The existing `Button`, `Chip`, `Input`, `Select`, `Tooltip`, and `Spinner` atoms are already used throughout the codebase. I decided to just add stories and tests to them instead of doing a full rewrite—it's a much safer approach that prevents us from accidentally breaking existing pages. New components like `DataTable`, `EmptyState`, `SearchBar`, and `UsageBar` live in their own directories.

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

---

## Bugs Found During Audit


### Bug 1: `useDebounce.ts` is an empty file

`src/hooks/useDebounce.ts` was a completely empty file — exporting nothing. Any component importing this hook would get `undefined` at runtime. The project uses `use-debounce` from npm in some places, but having an empty local hook file is confusing and error-prone. We implemented a working version as part of the SearchBar component work.

### Bug 2: `orchestrator.test.ts` permanently fails

`src/api/ai/orchestrator.test.ts` fails on every run of `npx vitest run`. All 122 individual tests pass, but this file-level failure pollutes CI output and trains developers to ignore test failures. It should either be fixed, marked with `describe.skip()`, or removed.

### Bug 3: `formatNumber(0)` returns `'-'` instead of `'0'`

In `src/utils/common/format_number.ts`, line 8 uses `if (!value) return '-'`. Since `!0` is `true` in JavaScript, calling `formatNumber(0)` returns `'-'` instead of the correctly formatted `'0'`. This affects any dashboard location displaying zero revenue, zero events, or zero API calls — showing a dash where `$0.00` or `0` should appear. The fix is to change the guard to `if (value == null || Number.isNaN(value)) return '-'`.

---

## Suggested Improvements

### Improvement 1: Migrate Chip colors to design tokens

The `Chip` component uses hardcoded hex values (`#ECFBE4`, `#377E6A`, etc.) instead of Tailwind tokens or CSS variables. If brand colors change, every variant needs manual updating across the `CHIP_COLORS` mapping. Consider extracting these into CSS custom properties (e.g., `--chip-success-bg`, `--chip-success-text`) in `index.css` so they can be themed centrally.

### Improvement 2: Add skeleton loading to FlexpriceTable

The existing `FlexpriceTable` component (used across Customers, Subscriptions, Invoices pages) has no loading skeleton state — it jumps from empty to fully loaded. Adding a `loading` prop with shimmer rows (like our `DataTable` component) would significantly improve perceived performance.

### Improvement 3: Consolidate debounce approach

The project currently has two debounce solutions: the npm `use-debounce` package and the local `useDebounce` hook (which we implemented). Consider standardizing on one — the local hook is simpler and avoids a dependency for 15 lines of code.

---

## Critical UI Critique (Live App Analysis)

After auditing the component library against the live Flexprice admin dashboard, I've identified three primary UI/UX areas for improvement:

### 1. The "Filter Black Hole" (Missing Empty States)
While the app has beautiful "Zero Data" pages for first-time users, it completely lacks empty states for filtered views. If a user filters the Invoice or Subscription table such that no results are returned, the app simply shows a blank table body. This is a "Black Hole" UX pattern—the user isn't sure if the data is still loading, if the app crashed, or if there are simply no matches. Our `EmptyState` component was designed specifically to fix this by providing a clear, icon-driven message for zero-result filtered states.

### 2. Loading Inconsistency
The app currently uses at least three different loading patterns: a centered `Loader2` icon, a small `LoaderCircleIcon` inside buttons, and a complete lack of loading state on the main tables (which jump from blank to filled). This creates a "jittery" feel during navigation. We recommend standardizing on the sharp CSS border-based `Spinner` for all centered states and adding skeleton shimmer rows to the `FlexpriceTable` to provide a smoother "Content-First" loading experience.

### 3. Visual Hierarchy on Data Dense Pages
The dashboard uses a very light grey (`#f9f9f9`) for the sidebar and white for the main content, separated by a thin `#E5E7EB` border. While clean, the contrast ratio is low. In high-glare environments, the boundary between navigation and content becomes muddy. We recommend increasing the sidebar border contrast to `#D1D5DB` or using a subtle shadow on the main content area to provide better depth and focus.

---

## Revision Log

### Entry 11: Tooltip Stories Required Children in Props Object

During the Storybook audit, `React.createElement(Tooltip, { content, side }, child)` compiled fine in JavaScript but failed TypeScript's type checker because `children` is a required prop on the `TooltipProps` interface. When `children` is passed as the third argument to `createElement`, TypeScript doesn't include it in the props type check — it only validates the second argument (the props object). The fix was restructuring to `React.createElement(Tooltip, { content, side, children: child })`. This is a subtle difference between JSX (which always works) and `createElement` with strict FC typing.

### Entry 12: DataTable Column Sorting Uses Controlled State

Chose controlled sort (`sort` + `onSort` props where the parent owns sort state) over internal sort (component sorts data itself) because the DataTable is designed for server-side paginated data. In the live app, clicking a column header on the invoices or customers table triggers a new API call with `sort_by` and `sort_direction` query params. If sorting happened internally, the component would only sort the current page's rows — not the full dataset. The controlled approach also lets the parent persist sort preferences in URL params or session storage.

### Entry 13: SidebarNav Story vs Real Sidebar Structural Difference

The story's `SidebarNav` is a self-contained component built specifically for Storybook, while the real `AppSidebar` uses Radix `Collapsible`, `react-router` `Link`, and the shadcn `Sidebar` primitives (`SidebarContent`, `SidebarMenuButton`, etc.). Recreating the full sidebar in Storybook would require mocking the router context and the `SidebarProvider` — both fragile in isolation. Instead, we built a simplified version that mirrors the exact nav structure, visual styling, and animation behavior without the routing dependencies. The missing items (Cost Sheets, Price Units, Groups, Taxes, Credit Notes, Service Accounts, Workflows) were added after comparing with `Sidebar.tsx`.

### Entry 14: Invoice Table Empty State Gap in Live App

The invoice table in the live app (`admin.flexprice.io/invoices`) has no empty state when filters return zero results — it shows a blank table body with headers but no rows and no message. The same issue appears on the Subscriptions and Customers pages. We built a standalone `EmptyState` component specifically for this case: it can be dropped into any table's empty slot, any modal body, or any section. The component renders at the `#fafafa` background, a vector icon, headline, description, and an optional CTA button — matching the pattern that does exist on the live app's top-level "no data yet" pages (e.g., first-time Features page), but extending it to filtered-results scenarios that the app currently misses.

