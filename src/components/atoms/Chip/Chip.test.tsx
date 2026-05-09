import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Chip from './Chip';
import React from 'react';

describe('Chip', () => {
	it('renders the label text', () => {
		render(React.createElement(Chip, { label: 'Active' }));
		expect(screen.getByText('Active')).toBeTruthy();
	});

	it('applies success variant colors', () => {
		render(React.createElement(Chip, { label: 'Active', variant: 'success' }));
		const chip = screen.getByRole('button');
		expect(chip.style.backgroundColor).toBe('rgb(236, 251, 228)');
		expect(chip.style.color).toBe('rgb(55, 126, 106)');
	});

	it('applies failed variant colors', () => {
		render(React.createElement(Chip, { label: 'Error', variant: 'failed' }));
		const chip = screen.getByRole('button');
		expect(chip.style.backgroundColor).toBe('rgb(254, 226, 226)');
		expect(chip.style.color).toBe('rgb(220, 38, 38)');
	});

	it('applies warning variant colors', () => {
		render(React.createElement(Chip, { label: 'Pending', variant: 'warning' }));
		const chip = screen.getByRole('button');
		expect(chip.style.backgroundColor).toBe('rgb(255, 247, 237)');
		expect(chip.style.color).toBe('rgb(194, 65, 12)');
	});

	it('applies info variant colors', () => {
		render(React.createElement(Chip, { label: 'Info', variant: 'info' }));
		const chip = screen.getByRole('button');
		expect(chip.style.backgroundColor).toBe('rgb(239, 248, 255)');
		expect(chip.style.color).toBe('rgb(47, 111, 226)');
	});

	it('applies default variant colors', () => {
		render(React.createElement(Chip, { label: 'Draft', variant: 'default' }));
		const chip = screen.getByRole('button');
		expect(chip.style.backgroundColor).toBe('rgb(240, 242, 245)');
		expect(chip.style.color).toBe('rgb(87, 100, 110)');
	});

	it('allows custom color overrides', () => {
		render(React.createElement(Chip, { label: 'Custom', bgColor: '#000000', textColor: '#ffffff' }));
		const chip = screen.getByRole('button');
		expect(chip.style.backgroundColor).toBe('rgb(0, 0, 0)');
		expect(chip.style.color).toBe('rgb(255, 255, 255)');
	});
});
