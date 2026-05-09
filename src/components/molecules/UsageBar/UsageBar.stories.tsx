import type { Meta, StoryObj } from '@storybook/react';
import UsageBar from './UsageBar';
import React from 'react';

const meta: Meta<typeof UsageBar> = {
	title: 'Molecules/UsageBar',
	component: UsageBar,
	tags: ['autodocs'],
	argTypes: {
		used: { control: { type: 'number', min: 0 } },
		total: { control: { type: 'number', min: 1 } },
		unit: { control: 'text' },
		showPercentage: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof UsageBar>;

export const LowUsage: Story = {
	args: {
		label: 'API Calls',
		used: 2500,
		total: 10000,
		unit: 'calls',
	},
};

export const MediumUsage: Story = {
	args: {
		label: 'Storage',
		used: 7200,
		total: 10000,
		unit: 'MB',
	},
};

export const HighUsage: Story = {
	args: {
		label: 'Bandwidth',
		used: 9500,
		total: 10000,
		unit: 'GB',
	},
};

export const AtLimit: Story = {
	args: {
		label: 'Tokens Used',
		used: 10000,
		total: 10000,
		unit: 'tokens',
	},
};

export const NoPercentage: Story = {
	args: {
		label: 'Events Processed',
		used: 4500,
		total: 10000,
		showPercentage: false,
	},
};

export const AllThresholds: Story = {
	render: () =>
		React.createElement('div', { className: 'space-y-6 max-w-lg' },
			React.createElement(UsageBar, { label: 'Healthy (25%)', used: 2500, total: 10000, unit: 'calls' }),
			React.createElement(UsageBar, { label: 'Warning (65%)', used: 6500, total: 10000, unit: 'calls' }),
			React.createElement(UsageBar, { label: 'Critical (92%)', used: 9200, total: 10000, unit: 'calls' }),
			React.createElement(UsageBar, { label: 'At Limit (100%)', used: 10000, total: 10000, unit: 'calls' }),
		),
};
