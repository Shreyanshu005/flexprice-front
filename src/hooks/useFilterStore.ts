import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Global filter store persisted to sessionStorage.
 *
 * Stores filter state per-route so that navigating away and back
 * preserves the user's active filters. Each route has its own
 * isolated filter namespace.
 *
 * URL fingerprint: the `getFilterCount` method returns the number
 * of active filters for a route, which can be appended to the URL
 * as `?f=<count>` for bookmarkability without bloating the query string.
 *
 * @example
 * ```ts
 * const { setFilter, getFilters, resetFilters, getFilterCount } = useFilterStore();
 *
 * setFilter('/invoices', 'status', 'paid');
 * setFilter('/invoices', 'dateRange', { from: '2026-01-01', to: '2026-01-31' });
 *
 * getFilters('/invoices');
 * // { status: 'paid', dateRange: { from: '2026-01-01', to: '2026-01-31' } }
 *
 * getFilterCount('/invoices'); // 2
 * ```
 */

type FilterState = Record<string, unknown>;

interface FilterStore {
	filters: Record<string, FilterState>;
	setFilter: (route: string, key: string, value: unknown) => void;
	resetFilters: (route: string) => void;
	getFilters: (route: string) => FilterState;
	getFilterCount: (route: string) => number;
}

const useFilterStore = create<FilterStore>()(
	persist(
		(set, get) => ({
			filters: {},

			setFilter: (route: string, key: string, value: unknown) =>
				set((state) => ({
					filters: {
						...state.filters,
						[route]: {
							...state.filters[route],
							[key]: value,
						},
					},
				})),

			resetFilters: (route: string) =>
				set((state) => ({
					filters: {
						...state.filters,
						[route]: {},
					},
				})),

			getFilters: (route: string) => get().filters[route] ?? {},

			getFilterCount: (route: string) => {
				const routeFilters = get().filters[route];
				if (!routeFilters) return 0;
				return Object.values(routeFilters).filter(
					(v) => v !== undefined && v !== null && v !== '',
				).length;
			},
		}),
		{
			name: 'flexprice-filters',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);

export default useFilterStore;
