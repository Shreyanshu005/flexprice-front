import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

/**
 * Search bar with debounced input for filtering data.
 *
 * Uses the `useDebounce` hook to delay the `onSearch` callback,
 * preventing excessive API calls on every keystroke. Matches the
 * search bar pattern from the live Flexprice dashboard (Revenue page,
 * Customers page) with a search icon prefix and clear button.
 */
export interface SearchBarProps {
	placeholder?: string;
	onSearch: (query: string) => void;
	debounceMs?: number;
	className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
	placeholder = 'Search...',
	onSearch,
	debounceMs = 300,
	className,
}) => {
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounce(query, debounceMs);

	React.useEffect(() => {
		onSearch(debouncedQuery);
	}, [debouncedQuery, onSearch]);

	const handleClear = useCallback(() => {
		setQuery('');
	}, []);

	return (
		<div className={cn(
			'flex items-center gap-2 px-3 h-9 border border-input rounded-[6px] bg-background focus-within:border-black transition-colors',
			className,
		)}>
			<Search className="size-4 text-muted-foreground shrink-0" />
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder={placeholder}
				className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
				data-testid="search-input"
			/>
			{query.length > 0 && (
				<button
					onClick={handleClear}
					className="p-0.5 rounded hover:bg-muted transition-colors"
					aria-label="Clear search"
					data-testid="clear-button"
				>
					<X className="size-3.5 text-muted-foreground" />
				</button>
			)}
		</div>
	);
};

export default SearchBar;
