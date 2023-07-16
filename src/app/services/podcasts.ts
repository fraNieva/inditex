import { api } from './api';

export interface Podcast {
	id: number;
	'im:name': { label: string };
	link: { attributes: { href: string } };
}

type PodcastsResponse = Podcast[];

export const postsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getPodcasts: build.query<PodcastsResponse, void>({
			query: () => ({ url: '/rss/toppodcasts/limit=100/json' }),
			transformResponse: (responseData: any) => {
				console.log('responseData :>> ', responseData);
				const loadedPodcasts = JSON.parse(responseData.contents).feed.entry.map((podcast: any) => {
					podcast.id = podcast.id.attributes['im:id'];
					return podcast;
				});
				// return usersAdapter.setAll(initialState, loadedUsers);
				return loadedPodcasts;
			},
			providesTags: (result = []) => [
				...result.map(({ id }) => ({ type: 'Podcasts', id } as const)),
				{ type: 'Podcasts' as const, id: 'LIST' },
			],
		}),
	}),
});

export const { useGetPodcastsQuery } = postsApi;
