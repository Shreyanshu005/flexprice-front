import type { Meta, StoryObj } from '@storybook/react';
import FullPageSpinner from './FullPageSpinner';

/**
 * Full-page loading indicator shown when navigating between pages
 * or when the entire page content is being fetched.
 *
 * Includes a fun loading message matching the live app tone.
 */
const meta: Meta<typeof FullPageSpinner> = {
	title: 'Atoms/FullPageSpinner',
	component: FullPageSpinner,
	tags: ['autodocs'],
	argTypes: {
		message: { control: 'text' },
		size: { control: { type: 'number', min: 16, max: 64 } },
	},
};

export default meta;
type Story = StoryObj<typeof FullPageSpinner>;

export const Default: Story = {};

export const WithCustomMessage: Story = {
	args: {
		message: 'Loading invoice details...',
	},
};

export const Large: Story = {
	args: {
		size: 48,
		message: 'Processing your request...',
	},
};

export const NoMessage: Story = {
	args: {
		message: '',
	},
};
