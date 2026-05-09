import React from 'react';
import Chip from '@/components/atoms/Chip/Chip';
import { CheckCircle, FileText, XCircle, Clock, AlertTriangle, CircleDot } from 'lucide-react';

/**
 * Invoice-specific status badge extending the base Chip atom.
 *
 * Maps each invoice status to the exact color + icon combination
 * observed in the live Flexprice invoice list page.
 *
 * Statuses found in the live app:
 * - paid:      green success chip with check icon
 * - draft:     grey default chip with file icon
 * - void:      blue info chip with x-circle icon
 * - overdue:   red failed chip with alert icon
 * - pending:   orange warning chip with clock icon
 * - finalized: blue info chip with dot icon
 */
export type InvoiceStatus = 'paid' | 'draft' | 'void' | 'overdue' | 'pending' | 'finalized';

interface InvoiceStatusBadgeProps {
	status: InvoiceStatus;
}

const STATUS_CONFIG: Record<InvoiceStatus, {
	label: string;
	variant: 'success' | 'default' | 'info' | 'failed' | 'warning';
	icon: React.ReactNode;
}> = {
	paid: {
		label: 'Paid',
		variant: 'success',
		icon: React.createElement(CheckCircle, { className: 'size-3.5' }),
	},
	draft: {
		label: 'Draft',
		variant: 'default',
		icon: React.createElement(FileText, { className: 'size-3.5' }),
	},
	void: {
		label: 'Void',
		variant: 'info',
		icon: React.createElement(XCircle, { className: 'size-3.5' }),
	},
	overdue: {
		label: 'Overdue',
		variant: 'failed',
		icon: React.createElement(AlertTriangle, { className: 'size-3.5' }),
	},
	pending: {
		label: 'Pending',
		variant: 'warning',
		icon: React.createElement(Clock, { className: 'size-3.5' }),
	},
	finalized: {
		label: 'Finalized',
		variant: 'info',
		icon: React.createElement(CircleDot, { className: 'size-3.5' }),
	},
};

const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({ status }) => {
	const config = STATUS_CONFIG[status];
	return (
		<Chip
			label={config.label}
			variant={config.variant}
			icon={config.icon}
		/>
	);
};

export default InvoiceStatusBadge;
