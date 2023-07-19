import React from 'react';
import './styles.css';

interface ErrorMessageProps {
	errorMsg: string;
}
const ErrorMessage = ({ errorMsg }: ErrorMessageProps) => {
	return (
		<div className="error__container">
			<p className="error__label">
				An error has occurred:
				<span className="error__message">{errorMsg}</span>
			</p>
		</div>
	);
};

export default ErrorMessage;
