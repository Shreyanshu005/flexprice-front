import React from 'react';
import Button from '@/components/atoms/Button/Button';

/**
 * Standalone empty state component for when a page or section has no data.
 *
 * Design extracted from the live Flexprice app empty pages:
 * - Background: `#fafafa`
 * - Border: `#E9E9E9`
 * - Heading: `text-gray-700`, 20px, font-medium
 * - Description: `text-gray-400`, 16px
 * - CTA button: outline variant with `#fbfbfb` bg and `#CFCFCF` border
 *
 * Unlike the existing EmptyPage organism which wraps the full Page layout,
 * this EmptyState is a standalone card that can be embedded anywhere
 * (inside tables, modals, sections, etc).
 */
export interface EmptyStateProps {
	icon: React.ReactNode;
	headline: string;
	subtext: string;
	cta?: {
		label: string;
		onClick: () => void;
	};
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, headline, subtext, cta }) => {
	return (
		<div className="bg-[#fafafa] border border-[#E9E9E9] rounded-[6px] w-full py-16 flex flex-col items-center justify-center">
			{icon && (
				<div className="mb-6 text-gray-300">
					{icon}
				</div>
			)}
			<h3 className="font-medium text-[20px] leading-normal text-gray-700 mb-3 text-center">
				{headline}
			</h3>
			<p className="font-normal text-[16px] leading-normal text-gray-400 mb-8 text-center max-w-[350px]">
				{subtext}
			</p>
			{cta && (
				<Button
					variant="outline"
					onClick={cta.onClick}
					className="!p-5 !bg-[#fbfbfb] !border-[#CFCFCF]"
				>
					{cta.label}
				</Button>
			)}
		</div>
	);
};

export default EmptyState;
