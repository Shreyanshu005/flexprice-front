import React from 'react';
import Spinner from './Spinner';

/**
 * Full-page loading state used when entire page content is loading.
 *
 * Displays a centered spinner with an optional loading message.
 * Messages match the quirky tone from the live Flexprice app
 * (e.g. "Brewing your usage insights ☕", "Doing complex math 🧮").
 */
interface FullPageSpinnerProps {
	message?: string;
	size?: number;
}

const LOADING_MESSAGES = [
	'Brewing your usage insights ☕',
	'Doing complex math 🧮',
	'Crunching the numbers 📊',
	'Loading your dashboard ✨',
	'Fetching the latest data 🔄',
];

const FullPageSpinner: React.FC<FullPageSpinnerProps> = ({ message, size = 32 }) => {
	const displayMessage = message ?? LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];

	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
			<Spinner size={size} className="text-[#092E44]" />
			{displayMessage && (
				<p className="text-sm text-muted-foreground animate-pulse">
					{displayMessage}
				</p>
			)}
		</div>
	);
};

export default FullPageSpinner;
