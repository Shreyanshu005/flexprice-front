import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DataTable from './DataTable';
import React from 'react';
import Chip from '@/components/atoms/Chip/Chip';
import { FileText } from 'lucide-react';

const meta: Meta<typeof DataTable> = {
	title: 'Molecules/DataTable',
	component: DataTable,
	tags: ['autodocs'],
	argTypes: {
		loading: { control: 'boolean' },
		virtualized: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof DataTable>;

const invoiceColumns = [
	{ key: 'id', header: 'Invoice ID' },
	{ key: 'customer', header: 'Customer' },
	{ key: 'amount', header: 'Amount', align: 'right' as const },
	{
		key: 'status',
		header: 'Status',
		render: (row: Record<string, unknown>) => {
			const status = String(row['status'] ?? '');
			const variantMap: Record<string, 'success' | 'warning' | 'failed' | 'info' | 'default'> = {
				paid: 'success',
				pending: 'warning',
				overdue: 'failed',
				draft: 'default',
				void: 'info',
			};
			return React.createElement(Chip, {
				label: status.charAt(0).toUpperCase() + status.slice(1),
				variant: variantMap[status] ?? 'default',
			});
		},
	},
	{ key: 'date', header: 'Date' },
];

const invoiceData = [
	{ id: 'INV-001', customer: 'Acme Corp', amount: '$1,200.00', status: 'paid', date: 'Jan 15, 2026' },
	{ id: 'INV-002', customer: 'Globex Inc', amount: '$3,450.00', status: 'pending', date: 'Jan 20, 2026' },
	{ id: 'INV-003', customer: 'Stark Labs', amount: '$890.00', status: 'overdue', date: 'Dec 10, 2025' },
	{ id: 'INV-004', customer: 'Wayne Ent', amount: '$5,600.00', status: 'paid', date: 'Jan 25, 2026' },
	{ id: 'INV-005', customer: 'Umbrella Co', amount: '$2,100.00', status: 'draft', date: 'Feb 01, 2026' },
	{ id: 'INV-006', customer: 'Cyberdyne', amount: '$750.00', status: 'void', date: 'Nov 30, 2025' },
];

export const Default: Story = {
	args: {
		columns: invoiceColumns,
		data: invoiceData,
	},
};

export const LoadingSkeleton: Story = {
	args: {
		columns: invoiceColumns,
		data: [],
		loading: true,
	},
};

export const EmptyState: Story = {
	args: {
		columns: invoiceColumns,
		data: [],
		emptyState: React.createElement('tr', null,
			React.createElement('td', { colSpan: 5, className: 'py-16 text-center' },
				React.createElement('div', { className: 'flex flex-col items-center gap-3' },
					React.createElement(FileText, { className: 'size-10 text-gray-300' }),
					React.createElement('p', { className: 'text-gray-500 font-medium' }, 'No invoices found'),
					React.createElement('p', { className: 'text-sm text-gray-400' }, 'Create your first invoice to get started'),
				),
			),
		),
	},
};

export const WithPagination: Story = {
	args: {
		columns: invoiceColumns,
		data: invoiceData.slice(0, 3),
		pagination: {
			page: 1,
			pageSize: 3,
			total: 6,
			onChange: fn(),
		},
	},
};

export const ClickableRows: Story = {
	args: {
		columns: invoiceColumns,
		data: invoiceData,
		onRowClick: fn(),
	},
};

const statuses = ['paid', 'draft', 'void'] as const;
const tenThousandRows = Array.from({ length: 10000 }, (_, i) => ({
	id: `INV-${String(i + 1).padStart(5, '0')}`,
	customer: `Customer ${i + 1}`,
	amount: `$${(Math.random() * 10000).toFixed(2)}`,
	status: statuses[i % 3],
	date: `${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i % 6]} ${(i % 28) + 1}, 2026`,
}));

export const Virtualized10kRows: Story = {
	args: {
		columns: invoiceColumns,
		data: tenThousandRows,
		virtualized: true,
	},
};
