import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DateRangePicker from './DateRangePicker';
import React from 'react';

/**
 * Date range picker wrapping shadcn Calendar with Radix Popover.
 *
 * Used on the Revenue page for filtering data by date range,
 * and on event debugger for filtering event timestamps.
 * Supports timezone switching (local/UTC) from the live app.
 */
const meta: Meta<typeof DateRangePicker> = {
	title: 'Molecules/DateRangePicker',
	component: DateRangePicker,
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
		placeholder: { control: 'text' },
		title: { control: 'text' },
	},
	args: {
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
	args: {
		placeholder: 'Select date range',
	},
};

export const WithTitle: Story = {
	args: {
		title: 'Date Range',
		placeholder: 'Pick a range',
	},
};

export const PreSelectedRange: Story = {
	args: {
		title: 'Billing Period',
		startDate: new Date(2026, 0, 1),
		endDate: new Date(2026, 0, 31),
	},
};

export const Disabled: Story = {
	args: {
		title: 'Locked Range',
		startDate: new Date(2026, 0, 1),
		endDate: new Date(2026, 0, 31),
		disabled: true,
	},
};

export const WithMinMaxDates: Story = {
	args: {
		title: 'Limited Range',
		placeholder: 'Select range',
		minDate: new Date(2025, 0, 1),
		maxDate: new Date(2026, 11, 31),
	},
};
