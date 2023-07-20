import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import PodcastsList from './PodcastsList';
import { PodcastProps, useGetPodcastsQuery } from '../../app/services/podcasts';
import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import { EntityState } from '@reduxjs/toolkit';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { MemoryRouter } from 'react-router-dom';
jest.mock('../../app/services/podcasts');

const mockedUseGetPodcastsQuery = useGetPodcastsQuery as jest.MockedFunction<
	typeof useGetPodcastsQuery
>;
describe('PodcastsList', () => {
	beforeEach(() => {
		mockedUseGetPodcastsQuery.mockReturnValue({
			data: {
				ids: ['1', '2', '3'],
				entities: {
					'1': {
						'im:name': { label: 'Podcast 1' },
						'im:artist': { label: 'Author 1' },
					},
					'2': {
						'im:name': { label: 'Podcast 2' },
						'im:artist': { label: 'Author 2' },
					},
					'3': {
						'im:name': { label: 'Podcast 3' },
						'im:artist': { label: 'Author 3' },
					},
				},
			},
			isSuccess: true,
			isError: false,
			error: null,
			refetch: function (): QueryActionCreatorResult<
				QueryDefinition<
					void,
					BaseQueryFn<
						string | FetchArgs,
						unknown,
						FetchBaseQueryError,
						{} & RetryOptions,
						FetchBaseQueryMeta
					>,
					'Podcasts' | 'Episodes',
					EntityState<PodcastProps>,
					'api'
				>
			> {
				throw new Error('Function not implemented.');
			},
		});
	});
	it('should render the podcasts list', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<PodcastsList />
				</MemoryRouter>
			</Provider>
		);
		const title = screen.getAllByTestId('podcast-card__title');
		expect(title.length).toBe(3);
	});
});
