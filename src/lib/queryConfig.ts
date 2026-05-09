/**
 * React Query configuration presets for the Flexprice dashboard.
 *
 * Three presets cover the common data freshness requirements:
 *
 * - **REALTIME**: staleTime 0 — for data that must always be fresh
 *   (e.g. event streams, active invoice status, usage meters)
 *
 * - **DEFAULT**: staleTime 5min, gcTime 10min — for most dashboard data
 *   (e.g. customer lists, subscription tables, plan configurations)
 *
 * - **STATIC**: staleTime 30min, gcTime 60min — for rarely-changing data
 *   (e.g. currency lists, feature flags, pricing models)
 *
 * Use `createQueryConfig` to get a preset with optional overrides.
 */
export const QUERY_PRESETS = {
	REALTIME: { staleTime: 0, gcTime: 5 * 60 * 1000 },
	DEFAULT: { staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000 },
	STATIC: { staleTime: 30 * 60 * 1000, gcTime: 60 * 60 * 1000 },
} as const;

export type QueryPresetKey = keyof typeof QUERY_PRESETS;

export type QueryConfig = {
	staleTime: number;
	gcTime: number;
};

/**
 * Creates a query configuration from a preset with optional overrides.
 *
 * @param preset - One of 'REALTIME', 'DEFAULT', or 'STATIC'
 * @param overrides - Partial config to merge on top of the preset
 * @returns Merged query configuration
 *
 * @example
 * ```ts
 * const config = createQueryConfig('DEFAULT', { staleTime: 60_000 });
 * // { staleTime: 60000, gcTime: 600000 }
 * ```
 */
export function createQueryConfig(
	preset: QueryPresetKey,
	overrides?: Partial<QueryConfig>,
): QueryConfig {
	return { ...QUERY_PRESETS[preset], ...overrides };
}
