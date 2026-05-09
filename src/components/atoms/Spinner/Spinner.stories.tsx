import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';
import React from 'react';

/**
 * SVG spinner for inline loading indicators.
 *
 * Used inside buttons (isLoading state), next to text labels,
 * and as part of full-page loading states. The spinner uses
 * CSS `animate-spin` for smooth rotation.
 */
const meta: Meta<typeof Spinner> = {
	title: 'Atoms/Spinner',
	component: Spinner,
	tags: ['autodocs'],
	argTypes: {
		size: { control: { type: 'number', min: 12, max: 64 } },
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
	args: {
		size: 24,
	},
};

export const Small: Story = {
	args: {
		size: 16,
	},
};

export const Large: Story = {
	args: {
		size: 48,
	},
};

export const AllSizes: Story = {
	render: () =>
		React.createElement('div', { className: 'flex items-center gap-6' },
			React.createElement('div', { className: 'flex flex-col items-center gap-2' },
				React.createElement(Spinner, { size: 16 }),
				React.createElement('span', { className: 'text-xs text-muted-foreground' }, '16px'),
			),
			React.createElement('div', { className: 'flex flex-col items-center gap-2' },
				React.createElement(Spinner, { size: 24 }),
				React.createElement('span', { className: 'text-xs text-muted-foreground' }, '24px'),
			),
			React.createElement('div', { className: 'flex flex-col items-center gap-2' },
				React.createElement(Spinner, { size: 32 }),
				React.createElement('span', { className: 'text-xs text-muted-foreground' }, '32px'),
			),
			React.createElement('div', { className: 'flex flex-col items-center gap-2' },
				React.createElement(Spinner, { size: 48 }),
				React.createElement('span', { className: 'text-xs text-muted-foreground' }, '48px'),
			),
		),
};

export const InlineWithText: Story = {
	render: () =>
		React.createElement('div', { className: 'flex items-center gap-2 text-sm text-muted-foreground' },
			React.createElement(Spinner, { size: 16 }),
			'Loading data...',
		),
};

export const WithColor: Story = {
	render: () =>
		React.createElement('div', { className: 'flex items-center gap-6' },
			React.createElement(Spinner, { size: 24, className: 'text-blue-500' }),
			React.createElement(Spinner, { size: 24, className: 'text-green-500' }),
			React.createElement(Spinner, { size: 24, className: 'text-red-500' }),
			React.createElement(Spinner, { size: 24, className: 'text-[#092E44]' }),
		),
};
