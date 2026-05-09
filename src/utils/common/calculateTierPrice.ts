/**
 * Calculates the total price for a given quantity using graduated tiered pricing.
 *
 * In graduated pricing, each tier applies only to units within its range.
 * Tier ranges are exclusive on the 'from' side and inclusive on the 'to' side,
 * except the first tier which starts at 0.
 *
 * @param tiers - Array of pricing tiers with from/to/unitPrice (sorted ascending)
 * @param quantity - Number of units to calculate price for
 * @returns Total price for the given quantity
 *
 * @example
 * ```ts
 * const tiers = [
 *   { from: 0, to: 100, unitPrice: 0.10 },
 *   { from: 101, to: 500, unitPrice: 0.08 },
 *   { from: 501, to: Infinity, unitPrice: 0.05 },
 * ];
 * calculateTierPrice(tiers, 150); // 14.00
 * ```
 */
export interface PriceTier {
	from: number;
	to: number;
	unitPrice: number;
}

export function calculateTierPrice(tiers: PriceTier[], quantity: number): number {
	let total = 0;
	let consumed = 0;

	for (const tier of tiers) {
		if (consumed >= quantity) break;

		const tierEnd = tier.to === Infinity ? quantity : tier.to;
		const tierCapacity = tierEnd - consumed;
		const remaining = quantity - consumed;
		const unitsInTier = Math.min(remaining, tierCapacity);

		total += unitsInTier * tier.unitPrice;
		consumed += unitsInTier;
	}

	return Math.round(total * 100) / 100;
}
