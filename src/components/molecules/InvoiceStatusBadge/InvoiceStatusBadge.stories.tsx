import type { Meta, StoryObj } from '@storybook/react';
import InvoiceStatusBadge from './InvoiceStatusBadge';
import type { InvoiceStatus } from './InvoiceStatusBadge';
import React from 'react';

const meta: Meta<typeof InvoiceStatusBadge> = {
	title: 'Molecules/InvoiceStatusBadge',
	component: InvoiceStatusBadge,
	tags: ['autodocs'],
	argTypes: {
		status: {
			control: 'select',
			options: ['paid', 'draft', 'void', 'overdue', 'pending', 'finalized'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof InvoiceStatusBadge>;

export const Paid: Story = { args: { status: 'paid' } };
export const Draft: Story = { args: { status: 'draft' } };
export const Void: Story = { args: { status: 'void' } };
export const Overdue: Story = { args: { status: 'overdue' } };
export const Pending: Story = { args: { status: 'pending' } };
export const Finalized: Story = { args: { status: 'finalized' } };

export const AllStatuses: Story = {
	render: () => {
		const statuses: InvoiceStatus[] = ['paid', 'draft', 'void', 'overdue', 'pending', 'finalized'];
		return React.createElement('div', { className: 'flex flex-wrap gap-3 items-center' },
			...statuses.map((status) =>
				React.createElement(InvoiceStatusBadge, { key: status, status }),
			),
		);
	},
};
