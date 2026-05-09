import type { Meta, StoryObj } from '@storybook/react';
import { fn, expect, userEvent, within } from '@storybook/test';
import Button from './Button';
import { Mail, ArrowRight, Plus } from 'lucide-react';
import React from 'react';

/**
 * Primary action button used across the Flexprice dashboard.
 *
 * Supports multiple visual variants (default, black, destructive, outline, secondary, ghost)
 * and sizes (xs, sm, default, lg, icon). Includes loading and disabled states.
 *
 * Color reference from live app:
 * - Default (primary CTA): `#092E44` bg with white text
 * - Destructive: red bg from `--destructive` CSS variable
 * - Outline: transparent bg with `border-input` border
 */
const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'black', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
			description: 'Visual style variant',
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'default', 'lg', 'icon'],
			description: 'Button size',
		},
		isLoading: {
			control: 'boolean',
			description: 'Shows spinner and disables interaction',
		},
		disabled: {
			control: 'boolean',
			description: 'Prevents all interaction',
		},
	},
	args: {
		onClick: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
	args: {
		children: 'Create Plan',
		variant: 'default',
		size: 'default',
	},
};

export const AllVariants: Story = {
	render: (args) =>
		React.createElement('div', { className: 'flex flex-wrap gap-3 items-center' },
			React.createElement(Button, { ...args, variant: 'default' }, 'Default'),
			React.createElement(Button, { ...args, variant: 'black' }, 'Black'),
			React.createElement(Button, { ...args, variant: 'destructive' }, 'Destructive'),
			React.createElement(Button, { ...args, variant: 'outline' }, 'Outline'),
			React.createElement(Button, { ...args, variant: 'secondary' }, 'Secondary'),
			React.createElement(Button, { ...args, variant: 'ghost' }, 'Ghost'),
			React.createElement(Button, { ...args, variant: 'link' }, 'Link'),
		),
};

export const AllSizes: Story = {
	render: (args) =>
		React.createElement('div', { className: 'flex flex-wrap gap-3 items-center' },
			React.createElement(Button, { ...args, size: 'xs' }, 'Extra Small'),
			React.createElement(Button, { ...args, size: 'sm' }, 'Small'),
			React.createElement(Button, { ...args, size: 'default' }, 'Default'),
			React.createElement(Button, { ...args, size: 'lg' }, 'Large'),
		),
};

export const Loading: Story = {
	args: {
		children: 'Saving...',
		isLoading: true,
	},
};

export const Disabled: Story = {
	args: {
		children: 'Disabled',
		disabled: true,
	},
};

export const WithPrefixIcon: Story = {
	args: {
		children: 'Send Email',
		prefixIcon: React.createElement(Mail, { className: 'size-4' }),
	},
};

export const WithSuffixIcon: Story = {
	args: {
		children: 'Next Step',
		suffixIcon: React.createElement(ArrowRight, { className: 'size-4' }),
	},
};

export const IconButton: Story = {
	args: {
		size: 'icon',
		variant: 'outline',
		children: React.createElement(Plus, { className: 'size-4' }),
		'aria-label': 'Add item',
	},
};

export const ClickFiresHandler: Story = {
	args: {
		children: 'Click Me',
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button');
		await userEvent.click(button);
		expect(args.onClick).toHaveBeenCalledTimes(1);
	},
};

export const LoadingPreventsDoubleClick: Story = {
	args: {
		children: 'Submit',
		isLoading: true,
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button');
		await userEvent.click(button);
		expect(args.onClick).not.toHaveBeenCalled();
	},
};
