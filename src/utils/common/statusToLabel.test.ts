import { describe, it, expect } from 'vitest';
import { statusToLabel } from './statusToLabel';

describe('statusToLabel', () => {
	it('converts lowercase status to capitalized label', () => {
		expect(statusToLabel('paid')).toBe('Paid');
	});

	it('converts uppercase status', () => {
		expect(statusToLabel('ACTIVE')).toBe('Active');
	});

	it('converts snake_case status to Title Case', () => {
		expect(statusToLabel('in_progress')).toBe('In Progress');
	});

	it('handles past_due', () => {
		expect(statusToLabel('past_due')).toBe('Past Due');
	});

	it('returns double dash for empty string', () => {
		expect(statusToLabel('')).toBe('--');
	});

	it('handles unknown statuses with generic formatting', () => {
		expect(statusToLabel('custom_status_here')).toBe('Custom Status Here');
	});

	it('handles all known domain statuses', () => {
		expect(statusToLabel('draft')).toBe('Draft');
		expect(statusToLabel('void')).toBe('Void');
		expect(statusToLabel('overdue')).toBe('Overdue');
		expect(statusToLabel('pending')).toBe('Pending');
		expect(statusToLabel('cancelled')).toBe('Cancelled');
		expect(statusToLabel('finalized')).toBe('Finalized');
		expect(statusToLabel('archived')).toBe('Archived');
	});
});
