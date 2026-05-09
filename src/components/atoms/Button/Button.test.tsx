import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';
import React from 'react';

describe('Button', () => {
	it('renders children correctly', () => {
		render(React.createElement(Button, null, 'Click me'));
		expect(screen.getByRole('button')).toHaveTextContent('Click me');
	});

	it('calls onClick when clicked', () => {
		const handleClick = vi.fn();
		render(React.createElement(Button, { onClick: handleClick }, 'Click'));
		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('does not fire onClick when loading', () => {
		const handleClick = vi.fn();
		render(React.createElement(Button, { onClick: handleClick, isLoading: true }, 'Loading'));
		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('does not fire onClick when disabled', () => {
		const handleClick = vi.fn();
		render(React.createElement(Button, { onClick: handleClick, disabled: true }, 'Disabled'));
		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('applies the correct variant class for default', () => {
		render(React.createElement(Button, { variant: 'default' }, 'Default'));
		const button = screen.getByRole('button');
		expect(button.className).toContain('bg-[#092E44]');
	});

	it('shows spinner icon when loading', () => {
		render(React.createElement(Button, { isLoading: true }, 'Loading'));
		const button = screen.getByRole('button');
		const svg = button.querySelector('svg');
		expect(svg).toBeTruthy();
		expect(svg?.classList.contains('animate-spin')).toBe(true);
	});
});
