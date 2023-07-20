import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PodcastCard from './PodcastCard';
import { selectPodcastById } from '../../app/services/podcasts';
import { useSelector } from 'react-redux';

jest.mock('react-redux');
jest.mock('../../app/services/podcasts');
const mockedUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockedSelectPodcastById = selectPodcastById as jest.MockedFunction<typeof selectPodcastById>;

describe('PodcastCard', () => {
	beforeEach(() => {
		mockedUseSelector.mockImplementation((selector) => selector({}));
		mockedSelectPodcastById.mockReturnValue({
			id: '1',
			slug: 'podcast-1',
			'im:name': { label: 'Podcast 1' },
			'im:artist': { label: 'Author 1' },
			'im:image': [
				{ label: 'https://example.com/image.jpg', attributes: { height: '155' } },
				{ label: 'https://example.com/image2.jpg', attributes: { height: '155' } },
			],
			link: { attributes: { href: 'https://example.com/link' } },
			summary: { label: 'Summary' },
		});
	});
	it('should render the podcast card', () => {
		render(
			<MemoryRouter>
				<PodcastCard podcastId="1" />
			</MemoryRouter>
		);
		const title = screen.getByTestId('podcast-card__title');
		expect(title.textContent).toBe('Podcast 1');
		const author = screen.getByTestId('podcast-card__author');
		expect(author.textContent).toBe('Author: Author 1');
		const image = screen.getByTestId('podcast-card__image') as HTMLImageElement;
		expect(image.src).toBe('https://example.com/image2.jpg');
	});

	test('it should render podcast link', () => {
		render(
			<MemoryRouter>
				<PodcastCard podcastId="1" />
			</MemoryRouter>
		);
		const link = screen.getByRole('link');

		expect(link).toHaveAttribute('href', '/podcast/podcast-1');
	});
});
