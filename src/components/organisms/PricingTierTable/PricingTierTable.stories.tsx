import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import PricingTierTable from './PricingTierTable';

const meta: Meta<typeof PricingTierTable> = {
	title: 'Organisms/PricingTierTable',
	component: PricingTierTable,
	tags: ['autodocs'],
	argTypes: {
		model: {
			control: 'select',
			options: ['graduated', 'volume', 'flat', 'package'],
		},
		currency: { control: 'text' },
		packageSize: { control: 'number' },
	},
};

export default meta;
type Story = StoryObj<typeof PricingTierTable>;

export const GraduatedPricing: Story = {
	args: {
		model: 'graduated',
		currency: '$',
		tiers: [
			{ from: 0, to: 100, unitPrice: 0.10, flatFee: 0 },
			{ from: 101, to: 500, unitPrice: 0.08, flatFee: 0 },
			{ from: 501, to: 1000, unitPrice: 0.05 },
			{ from: 1001, to: 'infinity', unitPrice: 0.03 },
		],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const rows = canvas.getAllByText(/^Tier \d+$/);
		expect(rows).toHaveLength(4);
		expect(canvas.getByText('Graduated')).toBeInTheDocument();
		expect(canvas.getByText(/Each tier's rate/)).toBeInTheDocument();
	},
};

export const VolumePricing: Story = {
	args: {
		model: 'volume',
		currency: '$',
		tiers: [
			{ from: 0, to: 1000, unitPrice: 0.05 },
			{ from: 1001, to: 5000, unitPrice: 0.04 },
			{ from: 5001, to: 'infinity', unitPrice: 0.02 },
		],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText('Volume')).toBeInTheDocument();
		expect(canvas.getByText(/Total usage determines/)).toBeInTheDocument();
	},
};

export const FlatRate: Story = {
	args: {
		model: 'flat',
		currency: '$',
		tiers: [
			{ from: 0, to: 'infinity', unitPrice: 99 },
		],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText('Flat Rate')).toBeInTheDocument();
		expect(canvas.getByText(/Fixed price/)).toBeInTheDocument();
	},
};

export const PackagePricing: Story = {
	args: {
		model: 'package',
		currency: '$',
		packageSize: 100,
		tiers: [
			{ from: 0, to: 1000, unitPrice: 10 },
			{ from: 1001, to: 5000, unitPrice: 8 },
			{ from: 5001, to: 'infinity', unitPrice: 5 },
		],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText('Package')).toBeInTheDocument();
		expect(canvas.getByText(/100 units per package/)).toBeInTheDocument();
		expect(canvas.getByText('Package Price')).toBeInTheDocument();
	},
};

export const WithFlatFees: Story = {
	args: {
		model: 'graduated',
		currency: '€',
		tiers: [
			{ from: 0, to: 100, unitPrice: 0.10, flatFee: 5 },
			{ from: 101, to: 500, unitPrice: 0.07, flatFee: 10 },
			{ from: 501, to: 2000, unitPrice: 0.04, flatFee: 20 },
			{ from: 2001, to: 'infinity', unitPrice: 0.02, flatFee: 50 },
		],
	},
};

export const ManyTiers: Story = {
	args: {
		model: 'graduated',
		currency: '$',
		tiers: Array.from({ length: 12 }, (_, i) => ({
			from: i * 1000,
			to: i === 11 ? 'infinity' as const : (i + 1) * 1000 - 1,
			unitPrice: Math.max(0.01, 0.12 - i * 0.01),
		})),
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const rows = canvas.getAllByText(/^Tier \d+$/);
		expect(rows).toHaveLength(12);
	},
};
