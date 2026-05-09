import { describe, it, expect } from 'vitest';
import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
	it('formats USD correctly', () => {
		const result = formatCurrency(1000, 'USD');
		expect(result).toContain('1,000.00');
	});

	it('formats zero amount', () => {
		const result = formatCurrency(0, 'USD');
		expect(result).toContain('0.00');
	});

	it('formats decimal amounts', () => {
		const result = formatCurrency(99.9, 'USD');
		expect(result).toContain('99.90');
	});

	it('formats large numbers with thousand separators', () => {
		const result = formatCurrency(1234567.89, 'USD');
		expect(result).toContain('1,234,567.89');
	});

	it('formats negative amounts', () => {
		const result = formatCurrency(-50, 'USD');
		expect(result).toContain('50.00');
	});
});
