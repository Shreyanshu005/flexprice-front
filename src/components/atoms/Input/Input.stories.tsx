import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import Input from './Input';
import React from 'react';
import { DollarSign, Search } from 'lucide-react';

/**
 * Text input component used throughout Flexprice for form fields.
 *
 * Supports text, number, formatted-number, and integer variants.
 * Includes label, error state (red border + message), prefix/suffix slots,
 * and disabled state matching the live app styling (6px border-radius, Inter font).
 */
const meta: Meta<typeof Input> = {
	title: 'Atoms/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['text', 'number', 'formatted-number', 'integer'],
		},
		size: {
			control: 'select',
			options: ['sm', 'default', 'lg'],
		},
		label: { control: 'text' },
		error: { control: 'text' },
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	args: {
		placeholder: 'Enter value...',
	},
};

export const WithLabel: Story = {
	args: {
		label: 'Plan Name',
		placeholder: 'e.g. Starter Plan',
	},
};

export const WithError: Story = {
	args: {
		label: 'Email',
		placeholder: 'user@example.com',
		error: 'Please enter a valid email address',
		value: 'invalid-email',
	},
};

export const WithCurrencyPrefix: Story = {
	args: {
		label: 'Amount',
		placeholder: '0.00',
		variant: 'formatted-number' as const,
		inputPrefix: React.createElement(DollarSign, { className: 'size-4 text-muted-foreground' }),
	},
};

export const WithSearchPrefix: Story = {
	args: {
		placeholder: 'Search customers...',
		inputPrefix: React.createElement(Search, { className: 'size-4 text-muted-foreground' }),
	},
};

export const WithSuffix: Story = {
	args: {
		label: 'API Calls',
		placeholder: '1000',
		variant: 'integer' as const,
		suffix: React.createElement('span', null, 'calls/mo'),
	},
};

export const DisabledState: Story = {
	args: {
		label: 'Read Only',
		value: 'Cannot edit',
		disabled: true,
	},
};

export const FormattedNumber: Story = {
	args: {
		label: 'Revenue',
		variant: 'formatted-number' as const,
		value: '1234567',
		inputPrefix: React.createElement(DollarSign, { className: 'size-4 text-muted-foreground' }),
	},
};

export const TypeAndVerify: Story = {
	args: {
		label: 'Username',
		placeholder: 'Type here...',
		id: 'test-input',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Type here...');
		await userEvent.type(input, 'hello');
		expect(input).toHaveValue('hello');
	},
};
