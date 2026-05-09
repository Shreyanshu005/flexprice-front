import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import useFilterStore from './useFilterStore';

describe('useFilterStore', () => {
	beforeEach(() => {
		const { result } = renderHook(() => useFilterStore());
		act(() => {
			result.current.resetFilters('/invoices');
			result.current.resetFilters('/customers');
		});
	});

	it('starts with empty filters for a route', () => {
		const { result } = renderHook(() => useFilterStore());
		expect(result.current.getFilters('/invoices')).toEqual({});
	});

	it('sets a filter for a specific route', () => {
		const { result } = renderHook(() => useFilterStore());
		act(() => {
			result.current.setFilter('/invoices', 'status', 'paid');
		});
		expect(result.current.getFilters('/invoices')).toEqual({ status: 'paid' });
	});

	it('sets multiple filters for the same route', () => {
		const { result } = renderHook(() => useFilterStore());
		act(() => {
			result.current.setFilter('/invoices', 'status', 'paid');
			result.current.setFilter('/invoices', 'customer', 'acme');
		});
		expect(result.current.getFilters('/invoices')).toEqual({
			status: 'paid',
			customer: 'acme',
		});
	});

	it('isolates filters between routes', () => {
		const { result } = renderHook(() => useFilterStore());
		act(() => {
			result.current.setFilter('/invoices', 'status', 'paid');
			result.current.setFilter('/customers', 'plan', 'starter');
		});
		expect(result.current.getFilters('/invoices')).toEqual({ status: 'paid' });
		expect(result.current.getFilters('/customers')).toEqual({ plan: 'starter' });
	});

	it('resets filters for a route without affecting others', () => {
		const { result } = renderHook(() => useFilterStore());
		act(() => {
			result.current.setFilter('/invoices', 'status', 'paid');
			result.current.setFilter('/customers', 'plan', 'starter');
			result.current.resetFilters('/invoices');
		});
		expect(result.current.getFilters('/invoices')).toEqual({});
		expect(result.current.getFilters('/customers')).toEqual({ plan: 'starter' });
	});

	it('returns correct filter count', () => {
		const { result } = renderHook(() => useFilterStore());
		act(() => {
			result.current.setFilter('/invoices', 'status', 'paid');
			result.current.setFilter('/invoices', 'customer', 'acme');
		});
		expect(result.current.getFilterCount('/invoices')).toBe(2);
	});

	it('excludes empty values from filter count', () => {
		const { result } = renderHook(() => useFilterStore());
		act(() => {
			result.current.setFilter('/invoices', 'status', 'paid');
			result.current.setFilter('/invoices', 'customer', '');
			result.current.setFilter('/invoices', 'amount', null);
		});
		expect(result.current.getFilterCount('/invoices')).toBe(1);
	});

	it('returns 0 count for unknown routes', () => {
		const { result } = renderHook(() => useFilterStore());
		expect(result.current.getFilterCount('/unknown')).toBe(0);
	});
});
