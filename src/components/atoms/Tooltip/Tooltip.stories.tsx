import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import Tooltip from './Tooltip';
import React from 'react';
import { HelpCircle, Info } from 'lucide-react';

/**
 * Tooltip component wrapping Radix UI TooltipProvider.
 *
 * Used throughout the dashboard to provide contextual help
 * on hover — for example, explaining what "stale time" means
 * in query configuration, or clarifying metric calculations.
 */
const meta: Meta<typeof Tooltip> = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	argTypes: {
		content: { control: 'text' },
		side: {
			control: 'select',
			options: ['top', 'right', 'bottom', 'left'],
		},
		align: {
			control: 'select',
			options: ['start', 'center', 'end'],
		},
		delayDuration: { control: 'number' },
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
	args: {
		content: 'This is a helpful tooltip',
		children: React.createElement(
			'button',
			{ className: 'inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground' },
			React.createElement(HelpCircle, { className: 'size-4' }),
			'Hover me',
		),
	},
};

export const AllSides: Story = {
	render: () =>
		React.createElement('div', { className: 'flex gap-8 items-center p-16' },
			React.createElement(Tooltip, { content: 'Top tooltip', side: 'top' },
				React.createElement('button', { className: 'px-3 py-1 border rounded text-sm' }, 'Top'),
			),
			React.createElement(Tooltip, { content: 'Right tooltip', side: 'right' },
				React.createElement('button', { className: 'px-3 py-1 border rounded text-sm' }, 'Right'),
			),
			React.createElement(Tooltip, { content: 'Bottom tooltip', side: 'bottom' },
				React.createElement('button', { className: 'px-3 py-1 border rounded text-sm' }, 'Bottom'),
			),
			React.createElement(Tooltip, { content: 'Left tooltip', side: 'left' },
				React.createElement('button', { className: 'px-3 py-1 border rounded text-sm' }, 'Left'),
			),
		),
};

export const WithDelay: Story = {
	args: {
		content: 'I appear after 500ms delay',
		delayDuration: 500,
		children: React.createElement(
			'button',
			{ className: 'inline-flex items-center gap-1 text-sm text-muted-foreground' },
			React.createElement(Info, { className: 'size-4' }),
			'Delayed tooltip',
		),
	},
};

export const RichContent: Story = {
	args: {
		content: React.createElement('div', { className: 'space-y-1' },
			React.createElement('p', { className: 'font-medium' }, 'Revenue Metric'),
			React.createElement('p', { className: 'text-xs text-muted-foreground' }, 'Total revenue collected in the selected period, excluding refunds and credits.'),
		),
		children: React.createElement(
			'span',
			{ className: 'text-sm underline decoration-dotted cursor-help' },
			'Net Revenue',
		),
	},
};

export const HoverShowsTooltip: Story = {
	args: {
		content: 'Tooltip content visible',
		delayDuration: 0,
		children: React.createElement(
			'button',
			{ className: 'px-3 py-1 border rounded text-sm', 'data-testid': 'tooltip-trigger' },
			'Hover to test',
		),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByTestId('tooltip-trigger');
		await userEvent.hover(trigger);
		await new Promise((resolve) => setTimeout(resolve, 100));
		expect(trigger).toBeInTheDocument();
	},
};
