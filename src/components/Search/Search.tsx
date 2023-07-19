import React from 'react';
import './styles.css';

interface SearchProps {
	count: number;
	search: string;
	setSearch: (e: string) => void;
}

const Search = ({ count, search, setSearch }: SearchProps) => {
	return (
		<div className="search__container">
			<span className="search__count">{count}</span>
			<input
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Filter podcasts..."
				className="search__input"
			/>
		</div>
	);
};

export default Search;
