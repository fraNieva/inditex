import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { api } from './api';
import { makeSlug } from '../../utils/helpers';

export interface EpisodeProps {
	trackId?: number;
	trackName?: string;
	trackTimeMillis?: number;
	trackViewUrl?: string;
	id?: number | string;
	description?: string;
	episodeUrl?: string;
	resultsCount?: number;
	slug?: string;
	releaseDate?: string;
}

type GetEpisodesArgs = { id?: string };

interface EpisodesResponse {
	resultCount: number;
	results: EpisodeProps[];
}

export const episodesAdapter = createEntityAdapter<EpisodeProps>({});

const initialState = episodesAdapter.getInitialState();

export const episodesApi = api.injectEndpoints({
	endpoints: (build) => ({
		getEpisodes: build.query<EntityState<EpisodeProps>, GetEpisodesArgs>({
			query: ({ id }) => {
				console.log('id >', id);
				return {
					url: `/lookup?id=${id}&media=podcast&entity=podcastEpisode`,
				};
			},
			keepUnusedDataFor: 24 * 60 * 60,
			transformResponse: (responseData: EpisodesResponse) => {
				let loadedEpisodes = responseData.results.map((episode: EpisodeProps) => {
					episode.id = episode.trackId;
					episode.slug = makeSlug(episode.trackName || '');
					return episode;
				});

				loadedEpisodes = [
					...loadedEpisodes,
					{ id: 'resultsCount', resultsCount: responseData.resultCount },
				];
				return episodesAdapter.setAll(initialState, loadedEpisodes);
			},
			providesTags: (result) => {
				if (result?.ids) {
					return [
						{ type: 'Episodes', id: 'LIST' },
						...result.ids.map((id: any) => ({ type: 'Episodes' as const, id })),
					];
				} else return [{ type: 'Episodes' as const, id: 'LIST' }];
			},
		}),
	}),
});

export const { useGetEpisodesQuery } = episodesApi;
