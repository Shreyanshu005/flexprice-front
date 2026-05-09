import React from 'react';

export interface DataTableColumn<T> {
	key: string;
	header: string;
	render?: (row: T) => React.ReactNode;
	width?: string | number;
	align?: 'left' | 'center' | 'right';
}

export interface DataTablePagination {
	page: number;
	pageSize: number;
	total: number;
	onChange: (page: number) => void;
}

export interface DataTableProps<T> {
	columns: DataTableColumn<T>[];
	data: T[];
	loading?: boolean;
	emptyState?: React.ReactNode;
	pagination?: DataTablePagination;
	onRowClick?: (row: T) => void;
	virtualized?: boolean;
	rowHeight?: number;
}
