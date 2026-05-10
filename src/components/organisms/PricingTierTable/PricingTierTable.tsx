import React from 'react';
import { cn } from '@/lib/utils';

export interface PricingTier {
	from: number;
	to: number | 'infinity';
	unitPrice: number;
	flatFee?: number;
}

export interface PricingTierTableProps {
	tiers: PricingTier[];
	currency: string;
	model: 'graduated' | 'volume' | 'flat' | 'package';
	packageSize?: number;
}

const MODEL_DESCRIPTIONS: Record<string, string> = {
	graduated: "Each tier's rate applies only to units within that tier's range",
	volume: 'Total usage determines the single rate applied to all units',
	flat: 'Fixed price regardless of usage volume',
	package: 'Price per bundle of units',
};

const MODEL_LABELS: Record<string, string> = {
	graduated: 'Graduated',
	volume: 'Volume',
	flat: 'Flat Rate',
	package: 'Package',
};

const PricingTierTable: React.FC<PricingTierTableProps> = ({ tiers, currency, model, packageSize }) => {
	const formatPrice = (amount: number): string => {
		if (amount >= 1) return `${currency}${amount.toFixed(2)}`;
		if (amount === 0) return `${currency}0`;
		return `${currency}${amount.toFixed(4)}`;
	};

	const formatRange = (from: number, to: number | 'infinity'): string => {
		if (to === 'infinity') return `${from.toLocaleString()}+`;
		return `${from.toLocaleString()} – ${to.toLocaleString()}`;
	};

	const hasFlatFees = tiers.some((t) => t.flatFee !== undefined && t.flatFee > 0);

	return (
		<div className="space-y-2">
			<div className="flex items-center gap-2">
				<span className="text-sm font-medium text-[#111827]">Pricing Model:</span>
				<span className="text-sm text-[#4B5563] bg-[#F0F2F5] px-2 py-0.5 rounded-[6px]">
					{MODEL_LABELS[model] ?? model}
				</span>
			</div>
			<p className="text-xs text-[#6B7280]">
				{MODEL_DESCRIPTIONS[model]}
				{model === 'package' && packageSize && ` (${packageSize} units per package)`}
			</p>

			<div className="rounded-[6px] border border-[#E2E8F0] overflow-hidden">
				<table className="w-full text-sm">
					<thead className="bg-muted border-b border-[#E2E8F0]">
						<tr>
							<th className="px-4 py-2 text-left text-[14px] font-medium text-[#64748B]">Tier</th>
							<th className="px-4 py-2 text-left text-[14px] font-medium text-[#64748B]">Range</th>
							<th className="px-4 py-2 text-right text-[14px] font-medium text-[#64748B]">
								{model === 'package' ? 'Package Price' : 'Unit Price'}
							</th>
							{hasFlatFees && (
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
									{model === 'flat' && idx > 0 ? '–' : formatPrice(tier.unitPrice)}
								</td>
								{hasFlatFees && (
									<td className="px-4 py-2 text-[14px] text-gray-700 text-right">
										{tier.flatFee !== undefined && tier.flatFee > 0 ? formatPrice(tier.flatFee) : '–'}
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
