import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('returns initial value immediately', () => {
		const { result } = renderHook(() => useDebounce('hello', 300));
		expect(result.current).toBe('hello');
	});

	it('does not update value before delay', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: 'initial', delay: 300 } },
		);

		rerender({ value: 'updated', delay: 300 });
		expect(result.current).toBe('initial');
	});

	it('updates value after delay', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: 'initial', delay: 300 } },
		);

		rerender({ value: 'updated', delay: 300 });

		act(() => {
			vi.advanceTimersByTime(300);
		});

		expect(result.current).toBe('updated');
	});

	it('resets timer on rapid changes', () => {
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounce(value, delay),
			{ initialProps: { value: 'a', delay: 300 } },
		);

		rerender({ value: 'ab', delay: 300 });
		act(() => { vi.advanceTimersByTime(100); });

		rerender({ value: 'abc', delay: 300 });
		act(() => { vi.advanceTimersByTime(100); });

		rerender({ value: 'abcd', delay: 300 });
		expect(result.current).toBe('a');

		act(() => { vi.advanceTimersByTime(300); });
		expect(result.current).toBe('abcd');
	});

	it('uses default delay of 300ms', () => {
		const { result, rerender } = renderHook(
			({ value }) => useDebounce(value),
			{ initialProps: { value: 'start' } },
		);

		rerender({ value: 'end' });
		act(() => { vi.advanceTimersByTime(299); });
		expect(result.current).toBe('start');

		act(() => { vi.advanceTimersByTime(1); });
		expect(result.current).toBe('end');
	});
});
