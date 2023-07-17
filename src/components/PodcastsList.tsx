import React from 'react';
import { useGetPodcastsQuery } from '../app/services/podcasts';
import PodcastCard from './PodcastCard';

const PodcastsList = () => {
	const { data, isLoading, isSuccess, isError, error } = useGetPodcastsQuery();

	let content = <></>;

	if (isLoading) content = <p>Loading...</p>;

	if (isError) {
		if ('status' in error) {
			const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

			content = (
				<div>
					<div>An error has occurred:</div>
					<div>{errMsg}</div>
				</div>
			);
		} else {
			content = <div>{error.message}</div>;
		}
	}

	if (isSuccess) {
		content = (
			<div>
				{data.ids.map((podcastId) => {
					return <PodcastCard key={podcastId} podcastId={podcastId} />;
				})}
			</div>
		);
	}

	return content;
};

export default PodcastsList;
