import React from 'react';
import { useGetPodcastsQuery } from '../app/services/podcasts';
import { Link } from 'react-router-dom';

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
				{data.map((podcast) => {
					return (
						<p>
							<Link to={`/podcast/${podcast.id}`}>{podcast['im:name'].label}</Link>
						</p>
					);
				})}
			</div>
		);
	}

	return content;
};

export default PodcastsList;
