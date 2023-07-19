import { EntityState, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { api } from './api';
import { RootState } from '../store';
import { makeSlug } from '../../utils/helpers';

export interface PodcastProps {
	id: { attributes: { 'im:id': string } } | string;
	'im:name': { label: string };
	link: { attributes: { href: string } };
	summary: { label: string };
	'im:image': PodcastImage[];
	'im:artist': { label: string };
	slug: string;
}

type PodcastImage = {
	label: string;
	attributes: {
		height: string;
	};
};

type PodcastsResponse = {
	feed: { entry: PodcastProps[] };
};

const podcastsAdapter = createEntityAdapter<PodcastProps>({});

const initialState = podcastsAdapter.getInitialState();

export const podcastsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getPodcasts: build.query<EntityState<PodcastProps>, void>({
			query: () => ({ url: '/us/rss/toppodcasts/limit=100/json' }),
			keepUnusedDataFor: 24 * 60 * 60,
			transformResponse: (responseData: PodcastsResponse) => {
				const loadedPodcasts = responseData.feed.entry.map((podcast: PodcastProps) => {
					if (typeof podcast.id === 'object') podcast.id = podcast.id.attributes['im:id'];
					podcast.slug = makeSlug(podcast['im:name'].label);
					return podcast;
				});
				return podcastsAdapter.setAll(initialState, loadedPodcasts);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						{ type: 'Podcasts', id: 'LIST' },
						...result.ids.map((id: any) => ({ type: 'Podcasts' as const, id })),
					];
				} else return [{ type: 'Podcasts', id: 'LIST' }];
			},
		}),
	}),
});

// returns the query result object
export const selectPodcastsResult = podcastsApi.endpoints.getPodcasts.select();

// creates memoized selector
const selectPodcastsData = createSelector(
	selectPodcastsResult,
	(podcastsResult) => podcastsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
	selectAll: selectAllPodcasts,
	selectById: selectPodcastById,
	selectIds: selectPodcastIds,
	// Pass in a selector that returns the users slice of state
} = podcastsAdapter.getSelectors((state: RootState) => selectPodcastsData(state) ?? initialState);

export const { useGetPodcastsQuery } = podcastsApi;
