import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * KPI metric card displayed on the Flexprice dashboard.
 *
 * Shows a label, formatted value, and optional trend indicator.
 * Design matches the live app: white bg, `#E5E7EB` border,
 * `#4B5563` label color, `#111827` value color, 25px padding.
 *
 * Includes a loading skeleton state for data fetching.
 */
export interface MetricCardProps {
	label: string;
	value: string | number;
	trend?: {
		direction: 'up' | 'down' | 'neutral';
		percentage: number;
	};
	loading?: boolean;
}

const MetricCardEnhanced: React.FC<MetricCardProps> = ({ label, value, trend, loading = false }) => {
	if (loading) {
		return (
			<div className="bg-white border border-[#E5E7EB] p-[25px] flex flex-col gap-3 rounded-md animate-pulse">
				<div className="h-4 w-24 bg-gray-200 rounded" />
				<div className="h-7 w-32 bg-gray-200 rounded" />
			</div>
		);
	}

	const trendColor = trend?.direction === 'up'
		? 'text-[#16A34A]'
		: trend?.direction === 'down'
			? 'text-[#DC2626]'
			: 'text-[#64748B]';

	const TrendIcon = trend?.direction === 'up'
		? TrendingUp
		: trend?.direction === 'down'
			? TrendingDown
			: Minus;

	return (
		<div className="bg-white border border-[#E5E7EB] p-[25px] flex flex-col gap-3 rounded-md">
			<p className="text-[14px] leading-[21px] text-[#4B5563] font-normal">
				{label}
			</p>
			<div className="flex items-center gap-3">
				<p className="text-[24px] leading-[28px] font-medium text-[#111827]">
					{value}
				</p>
				{trend && (
					<span className={cn('inline-flex items-center gap-1 text-sm', trendColor)}>
						<TrendIcon size={16} />
						<span className="text-xs font-medium">{trend.percentage}%</span>
					</span>
				)}
			</div>
		</div>
	);
};

export default MetricCardEnhanced;
