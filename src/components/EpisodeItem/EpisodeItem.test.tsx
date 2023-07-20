import React from 'react';
import { render, screen } from '@testing-library/react';
import EpisodeItem from './EpisodeItem';
import { MemoryRouter } from 'react-router-dom';

describe('EpisodeItem unit tests', () => {
	test('renders EpisodeItem link', () => {
		render(
			<MemoryRouter>
				<EpisodeItem
					podcastId="12341"
					trackName={'Episode Name'}
					episodeSlug="episode-name"
					duration={2501000}
					releaseDate="2023-07-19T10:00:00Z"
				/>
			</MemoryRouter>
		);
		const link = screen.getByRole('link', {
			name: 'Episode Name',
		});

		expect(link).toHaveAttribute('href', '/podcast/12341/episode/episode-name');
	});

	test('renders EpisodeItem duration', () => {
		render(
			<MemoryRouter>
				<EpisodeItem
					podcastId="12341"
					trackName={'Episode Name'}
					episodeSlug="episode-name"
					duration={2501000}
					releaseDate="2023-07-19T10:00:00Z"
				/>
			</MemoryRouter>
		);

		const duration = screen.getByTestId('episode__duration');
		expect(duration.textContent).toBe('41:41');
	});

	test('renders EpisodeItem date', () => {
		render(
			<MemoryRouter>
				<EpisodeItem
					podcastId="12341"
					trackName={'Episode Name'}
					episodeSlug="episode-name"
					duration={2501000}
					releaseDate="2023-07-19T10:00:00Z"
				/>
			</MemoryRouter>
		);

		const duration = screen.getByTestId('episode__date');
		expect(duration.textContent).toBe('7/19/2023');
	});
});
