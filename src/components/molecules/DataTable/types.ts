import React from 'react';

export interface DataTableColumn<T> {
	key: string;
	header: string;
	render?: (row: T) => React.ReactNode;
	width?: string | number;
	align?: 'left' | 'center' | 'right';
	sortable?: boolean;
}

export interface DataTablePagination {
	page: number;
	pageSize: number;
	total: number;
	onChange: (page: number) => void;
}

export type SortDirection = 'asc' | 'desc';

export interface DataTableSort {
	key: string;
	direction: SortDirection;
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
	sort?: DataTableSort | null;
	onSort?: (sort: DataTableSort | null) => void;
}
