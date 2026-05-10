import type { Meta, StoryObj } from '@storybook/react';
import { fn, expect, userEvent, within } from '@storybook/test';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
	title: 'Molecules/SearchBar',
	component: SearchBar,
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text' },
		debounceMs: { control: 'number' },
	},
	args: {
		onSearch: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
	args: {
		placeholder: 'Search customers...',
	},
};

export const CustomPlaceholder: Story = {
	args: {
		placeholder: 'Filter invoices by ID or customer name...',
	},
};

export const NarrowWidth: Story = {
	args: {
		placeholder: 'Search...',
		className: 'max-w-xs',
	},
};

export const TypeAndClear: Story = {
	args: {
		placeholder: 'Type to search...',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByTestId('search-input');
		await userEvent.type(input, 'acme');
		expect(input).toHaveValue('acme');

		const clearButton = canvas.getByTestId('clear-button');
		await userEvent.click(clearButton);
		expect(input).toHaveValue('');
	},
};
