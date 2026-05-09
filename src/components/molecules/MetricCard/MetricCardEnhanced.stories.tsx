import type { Meta, StoryObj } from '@storybook/react';
import MetricCardEnhanced from './MetricCardEnhanced';
import React from 'react';

/**
 * Dashboard KPI metric card showing a label, value, and trend indicator.
 * Matches the live Flexprice dashboard cards exactly.
 */
const meta: Meta<typeof MetricCardEnhanced> = {
	title: 'Molecules/MetricCard',
	component: MetricCardEnhanced,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		value: { control: 'text' },
		loading: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof MetricCardEnhanced>;

export const Default: Story = {
	args: {
		label: 'Total Revenue',
		value: '$12,450.00',
		trend: { direction: 'up', percentage: 12.5 },
	},
};

export const NegativeTrend: Story = {
	args: {
		label: 'Churn Rate',
		value: '3.2%',
		trend: { direction: 'down', percentage: 8.1 },
	},
};

export const NeutralTrend: Story = {
	args: {
		label: 'Active Customers',
		value: '1,247',
		trend: { direction: 'neutral', percentage: 0 },
	},
};

export const NoTrend: Story = {
	args: {
		label: 'Total Invoices',
		value: '892',
	},
};

export const LoadingSkeleton: Story = {
	args: {
		label: 'Revenue',
		value: '$0',
		loading: true,
	},
};

export const ZeroValue: Story = {
	args: {
		label: 'Pending Payments',
		value: '$0.00',
	},
};

export const DashboardGrid: Story = {
	render: () =>
		React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-4' },
			React.createElement(MetricCardEnhanced, {
				label: 'Net Revenue',
				value: '$45,231.89',
				trend: { direction: 'up', percentage: 20.1 },
			}),
			React.createElement(MetricCardEnhanced, {
				label: 'Active Subscriptions',
				value: '2,350',
				trend: { direction: 'up', percentage: 4.3 },
			}),
			React.createElement(MetricCardEnhanced, {
				label: 'Usage Revenue',
				value: '$12,234.00',
				trend: { direction: 'down', percentage: 1.2 },
			}),
		),
};
