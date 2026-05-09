import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Input from './Input';
import React from 'react';

describe('Input', () => {
	it('renders with a label', () => {
		render(React.createElement(Input, { label: 'Email' }));
		expect(screen.getByText('Email')).toBeTruthy();
	});

	it('shows error message when error prop is passed', () => {
		render(React.createElement(Input, { error: 'Required field' }));
		expect(screen.getByText('Required field')).toBeTruthy();
	});

	it('applies destructive border class when in error state', () => {
		const { container } = render(React.createElement(Input, { error: 'Invalid' }));
		const wrapper = container.querySelector('.border-destructive');
		expect(wrapper).toBeTruthy();
	});

	it('renders placeholder text', () => {
		render(React.createElement(Input, { placeholder: 'Enter email' }));
		expect(screen.getByPlaceholderText('Enter email')).toBeTruthy();
	});

	it('renders in disabled state', () => {
		render(React.createElement(Input, { placeholder: 'Disabled', disabled: true }));
		const input = screen.getByPlaceholderText('Disabled');
		expect(input).toBeDisabled();
	});
});
