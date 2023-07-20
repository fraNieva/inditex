import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

test('renders spinner', () => {
	render(<Spinner />);
	const spinnerDiv = screen.getByTestId('spinner-container');
	expect(spinnerDiv).toBeInTheDocument();
});
