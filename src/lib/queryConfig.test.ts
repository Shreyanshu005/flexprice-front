import { describe, it, expect } from 'vitest';
import { QUERY_PRESETS, createQueryConfig } from './queryConfig';

describe('queryConfig', () => {
	describe('QUERY_PRESETS', () => {
		it('REALTIME has staleTime 0 for always-fresh data', () => {
			expect(QUERY_PRESETS.REALTIME.staleTime).toBe(0);
		});

		it('REALTIME has 5 minute gcTime', () => {
			expect(QUERY_PRESETS.REALTIME.gcTime).toBe(5 * 60 * 1000);
		});

		it('DEFAULT has 5 minute staleTime', () => {
			expect(QUERY_PRESETS.DEFAULT.staleTime).toBe(5 * 60 * 1000);
		});

		it('DEFAULT has 10 minute gcTime', () => {
			expect(QUERY_PRESETS.DEFAULT.gcTime).toBe(10 * 60 * 1000);
		});

		it('STATIC has 30 minute staleTime for rarely-changing data', () => {
			expect(QUERY_PRESETS.STATIC.staleTime).toBe(30 * 60 * 1000);
		});

		it('STATIC has 60 minute gcTime', () => {
			expect(QUERY_PRESETS.STATIC.gcTime).toBe(60 * 60 * 1000);
		});
	});

	describe('createQueryConfig', () => {
		it('returns preset values when no overrides given', () => {
			const config = createQueryConfig('DEFAULT');
			expect(config).toEqual({
				staleTime: 5 * 60 * 1000,
				gcTime: 10 * 60 * 1000,
			});
		});

		it('merges overrides with preset', () => {
			const config = createQueryConfig('DEFAULT', { staleTime: 60_000 });
			expect(config.staleTime).toBe(60_000);
			expect(config.gcTime).toBe(10 * 60 * 1000);
		});

		it('allows overriding both staleTime and gcTime', () => {
			const config = createQueryConfig('REALTIME', { staleTime: 1000, gcTime: 2000 });
			expect(config).toEqual({ staleTime: 1000, gcTime: 2000 });
		});

		it('returns correct STATIC preset', () => {
			const config = createQueryConfig('STATIC');
			expect(config.staleTime).toBe(30 * 60 * 1000);
			expect(config.gcTime).toBe(60 * 60 * 1000);
		});
	});
});
