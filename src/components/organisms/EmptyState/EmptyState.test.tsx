import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmptyState from './EmptyState';
import React from 'react';
import { FileText } from 'lucide-react';

describe('EmptyState', () => {
	it('renders headline and subtext', () => {
		render(React.createElement(EmptyState, {
			icon: React.createElement(FileText),
			headline: 'No invoices',
			subtext: 'Create your first invoice',
		}));
		expect(screen.getByText('No invoices')).toBeTruthy();
		expect(screen.getByText('Create your first invoice')).toBeTruthy();
	});

	it('renders CTA button when provided', () => {
		const handleClick = vi.fn();
		render(React.createElement(EmptyState, {
			icon: React.createElement(FileText),
			headline: 'No data',
			subtext: 'Get started',
			cta: { label: 'Create', onClick: handleClick },
		}));
		const button = screen.getByRole('button', { name: 'Create' });
		expect(button).toBeTruthy();
		fireEvent.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('does not render CTA when not provided', () => {
		render(React.createElement(EmptyState, {
			icon: React.createElement(FileText),
			headline: 'Empty',
			subtext: 'Nothing here',
		}));
		expect(screen.queryByRole('button')).toBeNull();
	});

	it('renders the icon', () => {
		const { container } = render(React.createElement(EmptyState, {
			icon: React.createElement(FileText, { 'data-testid': 'icon' }),
			headline: 'Test',
			subtext: 'Test description',
		}));
		expect(container.querySelector('svg')).toBeTruthy();
	});
});
