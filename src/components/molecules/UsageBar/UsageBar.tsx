import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Usage progress bar showing consumption against a total limit.
 *
 * Color thresholds match the Flexprice design system:
 * - Green (`#16A34A`): usage < 60% — healthy
 * - Yellow/Warning (`#CA8A04`): usage 60-90% — approaching limit
 * - Red/Danger (`#DC2626`): usage > 90% — at or near limit
 *
 * Used on the usage/meters page and customer detail views.
 */
export interface UsageBarProps {
	label: string;
	used: number;
	total: number;
	unit?: string;
	showPercentage?: boolean;
}

const UsageBar: React.FC<UsageBarProps> = ({
	label,
	used,
	total,
	unit = '',
	showPercentage = true,
}) => {
	const percentage = total > 0 ? Math.min((used / total) * 100, 100) : 0;

	const barColor = percentage >= 90
		? 'bg-[#DC2626]'
		: percentage >= 60
			? 'bg-[#CA8A04]'
			: 'bg-[#16A34A]';

	const textColor = percentage >= 90
		? 'text-[#DC2626]'
		: percentage >= 60
			? 'text-[#CA8A04]'
			: 'text-[#16A34A]';

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium text-[#111827]">{label}</span>
				<span className={cn('text-sm font-medium', textColor)}>
					{used.toLocaleString()}{unit ? ` ${unit}` : ''} / {total.toLocaleString()}{unit ? ` ${unit}` : ''}
					{showPercentage && (
						<span className="ml-1 text-muted-foreground">({percentage.toFixed(0)}%)</span>
					)}
				</span>
			</div>
			<div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
				<div
					className={cn('h-full rounded-full transition-all duration-500', barColor)}
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</div>
	);
};

export default UsageBar;
