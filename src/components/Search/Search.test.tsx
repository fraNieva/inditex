/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search component', () => {
	it('renders the correct count', () => {
		const count = 10;
		const { getByText } = render(<Search count={count} search="" setSearch={() => {}} />);
		const countElement = getByText(count.toString());
		expect(countElement).toBeInTheDocument();
	});

	it('updates the search value correctly', () => {
		const setSearchMock = jest.fn();
		const { getByPlaceholderText } = render(
			<Search count={0} search="" setSearch={setSearchMock} />
		);
		const inputElement = getByPlaceholderText('Filter podcasts...');
		const searchValue = 'example search';
		fireEvent.change(inputElement, { target: { value: searchValue } });
		expect(setSearchMock).toHaveBeenCalledWith(searchValue);
	});
});
