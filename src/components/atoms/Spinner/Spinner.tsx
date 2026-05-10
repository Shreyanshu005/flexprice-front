import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
	size?: number;
	className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, className = '' }) => {
	return (
		<div
			className={cn('inline-block rounded-full animate-spin', className)}
			style={{
				width: size,
				height: size,
				borderTop: '3px solid currentColor',
				borderRight: '3px solid transparent',
				boxSizing: 'border-box',
			}}
		/>
	);
};

export default Spinner;
