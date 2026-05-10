import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import type { DataTableColumn, DataTableProps } from './types';

function DataTable<T extends Record<string, unknown>>({
	columns,
	data,
	loading = false,
	emptyState,
	pagination,
	onRowClick,
	virtualized = false,
	rowHeight = 44,
	sort,
	onSort,
}: DataTableProps<T>) {
	const parentRef = useRef<HTMLDivElement>(null);

	const virtualizer = useVirtualizer({
		count: virtualized ? data.length : 0,
		getScrollElement: () => parentRef.current,
		estimateSize: () => rowHeight,
		overscan: 20,
	});

	const handleSort = (column: DataTableColumn<T>) => {
		if (!column.sortable || !onSort) return;

		if (!sort || sort.key !== column.key) {
			onSort({ key: column.key, direction: 'asc' });
		} else if (sort.direction === 'asc') {
			onSort({ key: column.key, direction: 'desc' });
		} else {
			onSort(null);
		}
	};

	const getSortIcon = (column: DataTableColumn<T>) => {
		if (!column.sortable) return null;

		if (sort?.key === column.key) {
			return sort.direction === 'asc'
				? React.createElement(ArrowUp, { className: 'size-3.5 text-[#111827]' })
				: React.createElement(ArrowDown, { className: 'size-3.5 text-[#111827]' });
		}
		return React.createElement(ArrowUpDown, { className: 'size-3.5 text-[#94A3B8]' });
	};

	const getCellValue = (row: T, column: DataTableColumn<T>): React.ReactNode => {
		if (column.render) {
			return column.render(row);
		}
		const value = row[column.key];
		if (value === null || value === undefined) return '--';
		return String(value);
	};

	const SKELETON_WIDTHS = [75, 60, 85, 50, 70];

	const renderSkeletonRows = () => {
		return Array.from({ length: 5 }).map((_, rowIdx) => (
			React.createElement('tr', { key: `skeleton-${rowIdx}`, className: 'border-b border-[#E2E8F0]' },
				columns.map((col, colIdx) => (
					React.createElement('td', {
						key: `skeleton-${rowIdx}-${colIdx}`,
						className: 'px-4 py-3',
						style: { width: col.width, textAlign: col.align ?? 'left' },
					},
						React.createElement('div', {
							className: 'h-4 rounded animate-pulse',
							style: {
								width: `${SKELETON_WIDTHS[(rowIdx + colIdx) % SKELETON_WIDTHS.length]}%`,
								background: 'linear-gradient(90deg, #E5E7EB 0%, #F3F4F6 50%, #E5E7EB 100%)',
								backgroundSize: '200% 100%',
								animation: 'shimmer 1.5s infinite',
							},
						}),
					)
				)),
			)
		));
	};

	const renderEmptyState = () => {
		if (emptyState) return emptyState;
		return (
			React.createElement('tr', null,
				React.createElement('td', { colSpan: columns.length, className: 'py-16 text-center' },
					React.createElement('div', { className: 'text-muted-foreground text-sm' }, 'No data available'),
				),
			)
		);
	};

	const renderHeader = () => (
		React.createElement('thead', { className: 'bg-muted border-b border-[#E2E8F0]' },
			React.createElement('tr', null,
				columns.map((col, idx) => (
					React.createElement('th', {
						key: col.key,
						className: cn(
							'h-10 px-4 text-[14px] font-medium text-[#64748B]',
							idx === 0 && 'rounded-tl-[6px]',
							idx === columns.length - 1 && 'rounded-tr-[6px]',
							col.sortable && 'cursor-pointer select-none hover:text-[#475569] transition-colors',
						),
						style: { width: col.width, textAlign: col.align ?? 'left' },
						onClick: () => handleSort(col),
					},
						React.createElement('div', {
							className: cn(
								'flex items-center gap-1.5',
								col.align === 'right' && 'justify-end',
								col.align === 'center' && 'justify-center',
							),
						},
							React.createElement('span', null, col.header),
							getSortIcon(col),
						),
					)
				)),
			),
		)
	);

	const renderRow = (row: T, rowIndex: number) => (
		React.createElement('tr', {
			key: rowIndex,
			className: cn(
				'border-b border-[#E2E8F0] transition-colors hover:bg-muted/50',
				onRowClick && 'cursor-pointer',
			),
			onClick: () => onRowClick?.(row),
		},
			columns.map((col) => (
				React.createElement('td', {
					key: col.key,
					className: 'px-4 py-2 text-[14px] font-normal text-gray-700',
					style: { width: col.width, textAlign: col.align ?? 'left' },
				},
					getCellValue(row, col),
				)
			)),
		)
	);

	const renderVirtualizedBody = () => {
		const items = virtualizer.getVirtualItems();
		return (
			React.createElement('div', {
				ref: parentRef,
				className: 'overflow-auto',
				style: { height: '500px' },
			},
				React.createElement('table', { className: 'w-full caption-bottom text-sm' },
					renderHeader(),
					React.createElement('tbody', null,
						React.createElement('tr', { style: { height: `${virtualizer.getTotalSize()}px`, position: 'relative' } },
							React.createElement('td', { colSpan: columns.length, style: { padding: 0 } },
								React.createElement('div', { style: { position: 'relative', height: `${virtualizer.getTotalSize()}px` } },
									items.map((virtualRow) => {
										const row = data[virtualRow.index];
										if (!row) return null;
										return (
											React.createElement('div', {
												key: virtualRow.key,
												className: cn(
													'absolute left-0 w-full flex border-b border-[#E2E8F0] transition-colors hover:bg-muted/50',
													onRowClick && 'cursor-pointer',
												),
												style: {
													height: `${virtualRow.size}px`,
													transform: `translateY(${virtualRow.start}px)`,
												},
												onClick: () => onRowClick?.(row),
											},
												columns.map((col) => (
													React.createElement('div', {
														key: col.key,
														className: 'px-4 py-2 text-[14px] font-normal text-gray-700 flex items-center',
														style: {
															width: col.width ?? `${100 / columns.length}%`,
															textAlign: col.align ?? 'left',
														},
													},
														getCellValue(row, col),
													)
												)),
											)
										);
									}),
								),
							),
						),
					),
				),
			)
		);
	};

	const renderPagination = () => {
		if (!pagination) return null;
		const { page, pageSize, total, onChange } = pagination;
		const totalPages = Math.ceil(total / pageSize);
		const start = (page - 1) * pageSize + 1;
		const end = Math.min(page * pageSize, total);

		return (
			React.createElement('div', { className: 'flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0]' },
				React.createElement('span', { className: 'text-sm text-muted-foreground' },
					total > 0 ? `${start}-${end} of ${total}` : 'No results',
				),
				React.createElement('div', { className: 'flex items-center gap-2' },
					React.createElement('button', {
						className: 'p-1 rounded hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed',
						disabled: page <= 1,
						onClick: () => onChange(page - 1),
					},
						React.createElement(ChevronLeft, { className: 'size-4' }),
					),
					React.createElement('span', { className: 'text-sm text-muted-foreground' },
						`Page ${page} of ${totalPages}`,
					),
					React.createElement('button', {
						className: 'p-1 rounded hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed',
						disabled: page >= totalPages,
						onClick: () => onChange(page + 1),
					},
						React.createElement(ChevronRight, { className: 'size-4' }),
					),
				),
			)
		);
	};

	if (virtualized && data.length > 0) {
		return (
			React.createElement('div', { className: 'rounded-[6px] border border-[#E2E8F0] overflow-hidden' },
				renderVirtualizedBody(),
				renderPagination(),
			)
		);
	}

	return (
		React.createElement('div', { className: 'rounded-[6px] border border-[#E2E8F0] overflow-hidden' },
			React.createElement('style', null, `
				@keyframes shimmer {
					0% { background-position: 200% 0; }
					100% { background-position: -200% 0; }
				}
			`),
			React.createElement('div', { className: 'relative w-full overflow-auto' },
				React.createElement('table', { className: 'w-full caption-bottom text-sm' },
					renderHeader(),
					React.createElement('tbody', null,
						loading
							? renderSkeletonRows()
							: data.length === 0
								? renderEmptyState()
								: data.map((row, idx) => renderRow(row, idx)),
					),
				),
			),
			renderPagination(),
		)
	);
}

export default DataTable;
