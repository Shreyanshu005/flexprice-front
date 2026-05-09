import { getCurrencySymbol } from './helper_functions';

/**
 * Formats a number as a currency string.
 *
 * Uses `Intl.NumberFormat` for proper locale formatting with
 * the appropriate currency symbol from `getCurrencySymbol`.
 *
 * @param amount - The numeric amount to format
 * @param currencyCode - ISO 4217 currency code (e.g. 'USD', 'EUR')
 * @returns Formatted currency string (e.g. '$1,000.00')
 *
 * @example
 * ```ts
 * formatCurrency(1000, 'USD')    // '$1,000.00'
 * formatCurrency(0, 'USD')       // '$0.00'
 * formatCurrency(99.9, 'EUR')    // '€99.90'
 * ```
 */
export function formatCurrency(amount: number, currencyCode: string): string {
	const symbol = getCurrencySymbol(currencyCode);
	const formatted = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);
	return `${symbol}${formatted}`;
}
