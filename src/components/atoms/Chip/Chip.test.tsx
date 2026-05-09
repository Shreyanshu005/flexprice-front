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
		const chip = screen.getByText('Active').closest('span');
		expect(chip?.style.backgroundColor).toBe('rgb(236, 251, 228)');
		expect(chip?.style.color).toBe('rgb(55, 126, 106)');
	});

	it('applies failed variant colors', () => {
		render(React.createElement(Chip, { label: 'Error', variant: 'failed' }));
		const chip = screen.getByText('Error').closest('span');
		expect(chip?.style.backgroundColor).toBe('rgb(254, 226, 226)');
		expect(chip?.style.color).toBe('rgb(220, 38, 38)');
	});

	it('applies warning variant colors', () => {
		render(React.createElement(Chip, { label: 'Pending', variant: 'warning' }));
		const chip = screen.getByText('Pending').closest('span');
		expect(chip?.style.backgroundColor).toBe('rgb(255, 247, 237)');
		expect(chip?.style.color).toBe('rgb(194, 65, 12)');
	});

	it('applies info variant colors', () => {
		render(React.createElement(Chip, { label: 'Info', variant: 'info' }));
		const chip = screen.getByText('Info').closest('span');
		expect(chip?.style.backgroundColor).toBe('rgb(239, 248, 255)');
		expect(chip?.style.color).toBe('rgb(47, 111, 226)');
	});

	it('allows custom color overrides', () => {
		render(React.createElement(Chip, { label: 'Custom', bgColor: '#000', textColor: '#fff' }));
		const chip = screen.getByText('Custom').closest('span');
		expect(chip?.style.backgroundColor).toBe('rgb(0, 0, 0)');
		expect(chip?.style.color).toBe('rgb(255, 255, 255)');
	});

	it('renders disabled state with reduced opacity', () => {
		render(React.createElement(Chip, { label: 'Disabled', disabled: true }));
		const chip = screen.getByText('Disabled').closest('span');
		expect(chip?.getAttribute('aria-disabled')).toBe('true');
	});
});
