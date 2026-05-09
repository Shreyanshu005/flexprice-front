import { describe, it, expect } from 'vitest';
import { calculateTierPrice } from './calculateTierPrice';

describe('calculateTierPrice', () => {
	const tiers = [
		{ from: 0, to: 100, unitPrice: 0.10 },
		{ from: 101, to: 500, unitPrice: 0.08 },
		{ from: 501, to: Infinity, unitPrice: 0.05 },
	];

	it('calculates price within first tier', () => {
		expect(calculateTierPrice(tiers, 50)).toBe(5.00);
	});

	it('calculates price spanning two tiers', () => {
		expect(calculateTierPrice(tiers, 150)).toBe(14.00);
	});

	it('calculates price spanning all tiers', () => {
		const result = calculateTierPrice(tiers, 600);
		expect(result).toBe(47.00);
	});

	it('returns 0 for zero quantity', () => {
		expect(calculateTierPrice(tiers, 0)).toBe(0);
	});

	it('calculates exactly at tier boundary', () => {
		expect(calculateTierPrice(tiers, 100)).toBe(10.00);
	});

	it('handles single tier', () => {
		const singleTier = [{ from: 0, to: Infinity, unitPrice: 0.05 }];
		expect(calculateTierPrice(singleTier, 1000)).toBe(50.00);
	});
});
