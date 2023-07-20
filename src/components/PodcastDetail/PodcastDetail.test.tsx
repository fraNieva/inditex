/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import PodcastDetail from './PodcastDetail';
import { PodcastProps } from '../../app/services/podcasts';
import { MemoryRouter } from 'react-router-dom';

const podcastMock = {
	'im:name': { label: 'Podcast Name' },
	'im:artist': { label: 'Podcast Author' },
	'im:image': [{ label: 'https://example.com/image.jpg' }],
	summary: { label: 'Podcast summary' },
} as PodcastProps;

describe('PodcastDetail', () => {
	it('should render the podcast details', () => {
		const { getByText, getByAltText } = render(
			<MemoryRouter>
				<PodcastDetail id="123" podcast={podcastMock} />
			</MemoryRouter>
		);
		expect(getByAltText('Podcast Name')).toBeInTheDocument();
		expect(getByText('Podcast Name')).toBeInTheDocument();
		expect(getByText('by Podcast Author')).toBeInTheDocument();
		expect(getByText('Description:')).toBeInTheDocument();
		expect(getByText('Podcast summary')).toBeInTheDocument();
	});

	it('should render the link to the podcast page', () => {
		const { getByRole } = render(
			<MemoryRouter>
				<PodcastDetail id="123" podcast={podcastMock} />
			</MemoryRouter>
		);
		const link = getByRole('link');
		expect(link).toHaveAttribute('href', '/podcast/123');
	});
});
