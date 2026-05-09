import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Displays pricing tier breakdown in a table format.
 *
 * Supports three pricing models observed on the live Plans page:
 * - **Graduated**: Each tier has its own unit price, applied per-slab
 * - **Volume**: A single unit price applies to all units based on volume tier
 * - **Flat**: A single flat fee regardless of quantity
 *
 * Tier ranges use "∞" for unbounded upper limits matching the live app display.
 * Currency symbol is displayed with the unit price.
 */
export interface PricingTier {
	from: number;
	to: number | 'infinity';
	unitPrice: number;
	flatFee?: number;
}

export interface PricingTierTableProps {
	tiers: PricingTier[];
	currency: string;
	model: 'graduated' | 'volume' | 'flat';
}

const PricingTierTable: React.FC<PricingTierTableProps> = ({ tiers, currency, model }) => {
	const formatPrice = (amount: number): string => {
		return `${currency}${amount.toFixed(amount % 1 === 0 ? 0 : 4)}`;
	};

	const formatRange = (from: number, to: number | 'infinity'): string => {
		if (to === 'infinity') return `${from.toLocaleString()}+`;
		return `${from.toLocaleString()} - ${to.toLocaleString()}`;
	};

	const modelLabel = model === 'graduated' ? 'Graduated'
		: model === 'volume' ? 'Volume'
			: 'Flat Rate';

	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium text-[#111827]">Pricing Model:</span>
				<span className="text-sm text-[#4B5563] bg-[#F0F2F5] px-2 py-0.5 rounded-[6px]">{modelLabel}</span>
			</div>

			<div className="rounded-[6px] border border-[#E2E8F0] overflow-hidden">
				<table className="w-full text-sm">
					<thead className="bg-muted border-b border-[#E2E8F0]">
						<tr>
							<th className="px-4 py-2 text-left text-[14px] font-medium text-[#64748B]">Tier</th>
							<th className="px-4 py-2 text-left text-[14px] font-medium text-[#64748B]">Range</th>
							<th className="px-4 py-2 text-right text-[14px] font-medium text-[#64748B]">Unit Price</th>
							{tiers.some((t) => t.flatFee !== undefined) && (
								<th className="px-4 py-2 text-right text-[14px] font-medium text-[#64748B]">Flat Fee</th>
							)}
						</tr>
					</thead>
					<tbody>
						{tiers.map((tier, idx) => (
							<tr
								key={idx}
								className={cn(
									'border-b border-[#E2E8F0] last:border-b-0',
									'hover:bg-muted/50 transition-colors',
								)}
							>
								<td className="px-4 py-2 text-[14px] font-medium text-[#111827]">
									Tier {idx + 1}
								</td>
								<td className="px-4 py-2 text-[14px] text-gray-700">
									{formatRange(tier.from, tier.to)}
								</td>
								<td className="px-4 py-2 text-[14px] text-gray-700 text-right">
									{model === 'flat' && idx > 0 ? '--' : formatPrice(tier.unitPrice)}
								</td>
								{tiers.some((t) => t.flatFee !== undefined) && (
									<td className="px-4 py-2 text-[14px] text-gray-700 text-right">
										{tier.flatFee !== undefined ? formatPrice(tier.flatFee) : '--'}
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PricingTierTable;
