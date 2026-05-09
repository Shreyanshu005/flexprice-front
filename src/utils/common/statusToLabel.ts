/**
 * Converts a raw status string to a human-readable label.
 *
 * Handles common status patterns found throughout the Flexprice app:
 * snake_case, UPPER_CASE, and lowercase. Applies special case
 * mappings for domain-specific terms.
 *
 * @param status - Raw status string from the API
 * @returns Human-readable label
 *
 * @example
 * ```ts
 * statusToLabel('paid')          // 'Paid'
 * statusToLabel('in_progress')   // 'In Progress'
 * statusToLabel('ACTIVE')        // 'Active'
 * statusToLabel('')              // '--'
 * ```
 */
export function statusToLabel(status: string): string {
	if (!status) return '--';

	const specialCases: Record<string, string> = {
		'active': 'Active',
		'paid': 'Paid',
		'draft': 'Draft',
		'void': 'Void',
		'overdue': 'Overdue',
		'pending': 'Pending',
		'cancelled': 'Cancelled',
		'finalized': 'Finalized',
		'archived': 'Archived',
		'in_progress': 'In Progress',
		'past_due': 'Past Due',
		'trialing': 'Trialing',
	};

	const lower = status.toLowerCase();
	if (specialCases[lower]) return specialCases[lower];

	return lower
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
