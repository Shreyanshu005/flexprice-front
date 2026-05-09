import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import EmptyState from './EmptyState';
import React from 'react';
import { FileText, Users, CreditCard, BarChart3, Layers2, Zap } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
	title: 'Organisms/EmptyState',
	component: EmptyState,
	tags: ['autodocs'],
	argTypes: {
		headline: { control: 'text' },
		subtext: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const WithCTA: Story = {
	args: {
		icon: React.createElement(FileText, { className: 'size-12' }),
		headline: 'No invoices yet',
		subtext: 'Create your first invoice to start billing your customers',
		cta: {
			label: 'Create Invoice',
			onClick: fn(),
		},
	},
};

export const WithoutCTA: Story = {
	args: {
		icon: React.createElement(BarChart3, { className: 'size-12' }),
		headline: 'This range is empty',
		subtext: 'Not enough revenue data is available in the selected range to show this statistics.',
	},
};

export const NoCustomers: Story = {
	args: {
		icon: React.createElement(Users, { className: 'size-12' }),
		headline: 'No customers found',
		subtext: 'Add your first customer to start managing subscriptions and billing',
		cta: {
			label: 'Add Customer',
			onClick: fn(),
		},
	},
};

export const NoSubscriptions: Story = {
	args: {
		icon: React.createElement(CreditCard, { className: 'size-12' }),
		headline: 'No active subscriptions',
		subtext: 'Create a subscription to start billing customers on a recurring basis',
		cta: {
			label: 'Create Subscription',
			onClick: fn(),
		},
	},
};

export const NoPlans: Story = {
	args: {
		icon: React.createElement(Layers2, { className: 'size-12' }),
		headline: 'No plans created',
		subtext: 'Create a plan to define pricing tiers and billing configurations for your products',
		cta: {
			label: 'Create Plan',
			onClick: fn(),
		},
	},
};

export const NoEvents: Story = {
	args: {
		icon: React.createElement(Zap, { className: 'size-12' }),
		headline: 'No events recorded',
		subtext: 'Start sending usage events via the API to track metered billing',
	},
};

export const AllContexts: Story = {
	render: () =>
		React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' },
			React.createElement(EmptyState, {
				icon: React.createElement(FileText, { className: 'size-10' }),
				headline: 'No invoices',
				subtext: 'Invoices will appear here once created',
				cta: { label: 'Create Invoice', onClick: fn() },
			}),
			React.createElement(EmptyState, {
				icon: React.createElement(Users, { className: 'size-10' }),
				headline: 'No customers',
				subtext: 'Add customers to start billing',
				cta: { label: 'Add Customer', onClick: fn() },
			}),
			React.createElement(EmptyState, {
				icon: React.createElement(BarChart3, { className: 'size-10' }),
				headline: 'No data',
				subtext: 'Select a different date range to see data',
			}),
			React.createElement(EmptyState, {
				icon: React.createElement(Zap, { className: 'size-10' }),
				headline: 'No events',
				subtext: 'Send events via the API',
			}),
		),
};
