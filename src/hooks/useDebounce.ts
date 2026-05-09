import { useState, useEffect } from 'react';

/**
 * Debounce hook that delays updating a value until after a specified delay.
 *
 * Useful for search inputs where we want to avoid firing an API call
 * on every keystroke. The SearchBar component uses this with a default
 * 300ms delay to match typical UX expectations.
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 300)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;
