import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Chip from './Chip';
import { CheckCircle, XCircle, Clock, AlertTriangle, Info } from 'lucide-react';
import React from 'react';

/**
 * Status chip/badge used throughout the Flexprice dashboard to indicate entity states.
 *
 * Color scheme directly from the live app (admin.flexprice.io):
 * - Success: bg `#ECFBE4`, text `#377E6A`, border `#d1e9ca`
 * - Failed:  bg `#FEE2E2`, text `#DC2626`
 * - Warning: bg `#FFF7ED`, text `#C2410C`
 * - Info:    bg `#EFF8FF`, text `#2F6FE2`
 * - Default: bg `#F0F2F5`, text `#57646E`
 *
 * Appears on: subscription status, plan status, invoice status, event status badges.
 */
const meta: Meta<typeof Chip> = {
	title: 'Atoms/Chip',
	component: Chip,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'success', 'warning', 'failed', 'info'],
			description: 'Visual variant mapped to status colors',
		},
		label: {
			control: 'text',
			description: 'Text content of the chip',
		},
		disabled: {
			control: 'boolean',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
	args: {
		label: 'Draft',
		variant: 'default',
	},
};

export const AllVariants: Story = {
	render: () =>
		React.createElement('div', { className: 'flex flex-wrap gap-3 items-center' },
			React.createElement(Chip, { label: 'Draft', variant: 'default' }),
			React.createElement(Chip, { label: 'Active', variant: 'success' }),
			React.createElement(Chip, { label: 'Pending', variant: 'warning' }),
			React.createElement(Chip, { label: 'Failed', variant: 'failed' }),
			React.createElement(Chip, { label: 'Processing', variant: 'info' }),
		),
};

export const WithIcons: Story = {
	render: () =>
		React.createElement('div', { className: 'flex flex-wrap gap-3 items-center' },
			React.createElement(Chip, {
				label: 'Active',
				variant: 'success',
				icon: React.createElement(CheckCircle, { className: 'size-3.5' }),
			}),
			React.createElement(Chip, {
				label: 'Cancelled',
				variant: 'failed',
				icon: React.createElement(XCircle, { className: 'size-3.5' }),
			}),
			React.createElement(Chip, {
				label: 'Pending',
				variant: 'warning',
				icon: React.createElement(Clock, { className: 'size-3.5' }),
			}),
			React.createElement(Chip, {
				label: 'Warning',
				variant: 'warning',
				icon: React.createElement(AlertTriangle, { className: 'size-3.5' }),
			}),
			React.createElement(Chip, {
				label: 'Info',
				variant: 'info',
				icon: React.createElement(Info, { className: 'size-3.5' }),
			}),
		),
};

export const Clickable: Story = {
	args: {
		label: 'Click me',
		variant: 'info',
		onClick: fn(),
	},
};

export const Disabled: Story = {
	args: {
		label: 'Disabled',
		variant: 'default',
		disabled: true,
	},
};

export const CustomColors: Story = {
	args: {
		label: 'Custom',
		textColor: '#6D28D9',
		bgColor: '#EDE9FE',
		borderColor: '#DDD6FE',
	},
};

export const WithChildrenAfter: Story = {
	args: {
		label: 'Status',
		variant: 'success',
		childrenAfter: React.createElement('span', { className: 'text-xs' }, '×'),
	},
};
