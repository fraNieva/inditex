import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessages unit tests', () => {
	test('displays error message', () => {
		render(<ErrorMessage errorMsg="Error descripton" />);

		const duration = screen.getByTestId('error__message');
		expect(duration.textContent).toBe('Error descripton');
	});
});
