import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DataTableColumn, DataTableProps } from './types';

/**
 * Enhanced data table component for the Flexprice dashboard.
 *
 * Built on top of the existing FlexpriceTable patterns but adds:
 * - Loading skeleton rows (shimmer animation)
 * - Empty state slot (matches live app `#fafafa` bg pattern)
 * - Pagination controls with page info
 * - Virtualized scrolling for 10k+ rows via `@tanstack/react-virtual`
 *
 * Uses the same border color (`#E2E8F0`), header style (`#64748B`),
 * and row height patterns as the live app tables.
 */
function DataTable<T extends Record<string, unknown>>({
	columns,
	data,
	loading = false,
	emptyState,
	pagination,
	onRowClick,
	virtualized = false,
	rowHeight = 44,
}: DataTableProps<T>) {
	const parentRef = useRef<HTMLDivElement>(null);

	const virtualizer = useVirtualizer({
		count: virtualized ? data.length : 0,
		getScrollElement: () => parentRef.current,
		estimateSize: () => rowHeight,
		overscan: 20,
	});

	const getCellValue = (row: T, column: DataTableColumn<T>): React.ReactNode => {
		if (column.render) {
			return column.render(row);
		}
		const value = row[column.key];
		if (value === null || value === undefined) return '--';
		return String(value);
	};

	const renderSkeletonRows = () => {
		return Array.from({ length: 5 }).map((_, rowIdx) => (
			<tr key={`skeleton-${rowIdx}`} className="border-b border-[#E2E8F0]">
				{columns.map((col, colIdx) => (
					<td
						key={`skeleton-${rowIdx}-${colIdx}`}
						className="px-4 py-3"
						style={{ width: col.width, textAlign: col.align ?? 'left' }}
					>
						<div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
					</td>
				))}
			</tr>
		));
	};

	const renderEmptyState = () => {
		if (emptyState) return emptyState;
		return (
			<tr>
				<td colSpan={columns.length} className="py-16 text-center">
					<div className="text-muted-foreground text-sm">No data available</div>
				</td>
			</tr>
		);
	};

	const renderHeader = () => (
		<thead className="bg-muted border-b border-[#E2E8F0]">
			<tr>
				{columns.map((col, idx) => (
					<th
						key={col.key}
						className={cn(
							'h-10 px-4 text-[14px] font-medium text-[#64748B]',
							idx === 0 && 'rounded-tl-[6px]',
							idx === columns.length - 1 && 'rounded-tr-[6px]',
						)}
						style={{ width: col.width, textAlign: col.align ?? 'left' }}
					>
						{col.header}
					</th>
				))}
			</tr>
		</thead>
	);

	const renderRow = (row: T, rowIndex: number) => (
		<tr
			key={rowIndex}
			className={cn(
				'border-b border-[#E2E8F0] transition-colors hover:bg-muted/50',
				onRowClick && 'cursor-pointer',
			)}
			onClick={() => onRowClick?.(row)}
		>
			{columns.map((col) => (
				<td
					key={col.key}
					className="px-4 py-2 text-[14px] font-normal text-gray-700"
					style={{ width: col.width, textAlign: col.align ?? 'left' }}
				>
					{getCellValue(row, col)}
				</td>
			))}
		</tr>
	);

	const renderVirtualizedBody = () => {
		const items = virtualizer.getVirtualItems();
		return (
			<div
				ref={parentRef}
				className="overflow-auto"
				style={{ height: '500px' }}
			>
				<table className="w-full caption-bottom text-sm">
					{renderHeader()}
					<tbody>
						<tr style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
							<td colSpan={columns.length} style={{ padding: 0 }}>
								<div style={{ position: 'relative', height: `${virtualizer.getTotalSize()}px` }}>
									{items.map((virtualRow) => {
										const row = data[virtualRow.index];
										if (!row) return null;
										return (
											<div
												key={virtualRow.key}
												className={cn(
													'absolute left-0 w-full flex border-b border-[#E2E8F0] transition-colors hover:bg-muted/50',
													onRowClick && 'cursor-pointer',
												)}
												style={{
													height: `${virtualRow.size}px`,
													transform: `translateY(${virtualRow.start}px)`,
												}}
												onClick={() => onRowClick?.(row)}
											>
												{columns.map((col) => (
													<div
														key={col.key}
														className="px-4 py-2 text-[14px] font-normal text-gray-700 flex items-center"
														style={{
															width: col.width ?? `${100 / columns.length}%`,
															textAlign: col.align ?? 'left',
														}}
													>
														{getCellValue(row, col)}
													</div>
												))}
											</div>
										);
									})}
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	};

	const renderPagination = () => {
		if (!pagination) return null;
		const { page, pageSize, total, onChange } = pagination;
		const totalPages = Math.ceil(total / pageSize);
		const start = (page - 1) * pageSize + 1;
		const end = Math.min(page * pageSize, total);

		return (
			<div className="flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0]">
				<span className="text-sm text-muted-foreground">
					{total > 0 ? `${start}-${end} of ${total}` : 'No results'}
				</span>
				<div className="flex items-center gap-2">
					<button
						className="p-1 rounded hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
						disabled={page <= 1}
						onClick={() => onChange(page - 1)}
					>
						<ChevronLeft className="size-4" />
					</button>
					<span className="text-sm text-muted-foreground">
						Page {page} of {totalPages}
					</span>
					<button
						className="p-1 rounded hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
						disabled={page >= totalPages}
						onClick={() => onChange(page + 1)}
					>
						<ChevronRight className="size-4" />
					</button>
				</div>
			</div>
		);
	};

	if (virtualized && data.length > 0) {
		return (
			<div className="rounded-[6px] border border-[#E2E8F0] overflow-hidden">
				{renderVirtualizedBody()}
				{renderPagination()}
			</div>
		);
	}

	return (
		<div className="rounded-[6px] border border-[#E2E8F0] overflow-hidden">
			<div className="relative w-full overflow-auto">
				<table className="w-full caption-bottom text-sm">
					{renderHeader()}
					<tbody>
						{loading
							? renderSkeletonRows()
							: data.length === 0
								? renderEmptyState()
								: data.map((row, idx) => renderRow(row, idx))
						}
					</tbody>
				</table>
			</div>
			{renderPagination()}
		</div>
	);
}

export default DataTable;
