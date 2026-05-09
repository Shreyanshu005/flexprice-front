import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import FlexPriceSelect from './Select';
import React from 'react';

/**
 * Dropdown select component built on Radix UI Select primitive.
 *
 * Used across the Flexprice dashboard for plan type selection,
 * billing period, currency, and filter dropdowns.
 * Supports standard and radio-button display modes.
 */
const meta: Meta<typeof FlexPriceSelect> = {
	title: 'Atoms/Select',
	component: FlexPriceSelect,
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
		isRadio: { control: 'boolean' },
		placeholder: { control: 'text' },
	},
	args: {
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof FlexPriceSelect>;

const basicOptions = [
	{ value: 'monthly', label: 'Monthly' },
	{ value: 'quarterly', label: 'Quarterly' },
	{ value: 'annual', label: 'Annually' },
];

const longOptions = Array.from({ length: 15 }, (_, i) => ({
	value: `option-${i + 1}`,
	label: `Option ${i + 1}`,
	description: i % 3 === 0 ? `Description for option ${i + 1}` : undefined,
}));

export const Default: Story = {
	args: {
		options: basicOptions,
		placeholder: 'Select billing period',
		label: 'Billing Period',
	},
};

export const WithSelectedValue: Story = {
	args: {
		options: basicOptions,
		value: 'monthly',
		label: 'Billing Period',
	},
};

export const RadioVariant: Story = {
	args: {
		options: [
			{ value: 'flat', label: 'Flat Fee', description: 'Fixed price per billing period' },
			{ value: 'tiered', label: 'Tiered', description: 'Price varies by usage volume' },
			{ value: 'package', label: 'Package', description: 'Price per bundle of units' },
		],
		isRadio: true,
		label: 'Billing Model',
		placeholder: 'Choose model',
	},
};

export const ManyOptions: Story = {
	args: {
		options: longOptions,
		placeholder: 'Select an option',
		label: 'Currency',
	},
};

export const Disabled: Story = {
	args: {
		options: basicOptions,
		disabled: true,
		value: 'monthly',
		label: 'Locked Selection',
	},
};

export const WithError: Story = {
	args: {
		options: basicOptions,
		placeholder: 'Required field',
		label: 'Plan Type',
		error: 'Please select a plan type',
	},
};

export const WithDescription: Story = {
	args: {
		options: basicOptions,
		description: 'Choose how often customers are billed',
		label: 'Billing Period',
		placeholder: 'Select period',
	},
};

export const NoOptions: Story = {
	args: {
		options: [],
		noOptionsText: 'No currencies available',
		label: 'Currency',
		placeholder: 'Select currency',
	},
};
