import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { EpisodeProps, useGetEpisodesQuery } from '../app/services/episodes';
import { selectPodcastById } from '../app/services/podcasts';
import { useSelector } from 'react-redux';

const Episode = () => {
	const { id, episodeId } = useParams();
	const { data, isLoading, isSuccess, isError, error } = useGetEpisodesQuery({
		id,
	});
	const podcast = useSelector((state: any) => selectPodcastById(state, id || ''));
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

	if (isSuccess && episodeId) {
		const { description, trackName, episodeUrl } = data.entities[episodeId] as EpisodeProps;
		content = (
			<>
				<aside>
					<Link to={`/podcast/${id}`}>
						<img src={podcast?.['im:image'][0].label} alt={podcast?.['im:name'].label} />
						<p>{podcast?.['im:name'].label}</p>
						<p>by {podcast?.['im:artist'].label}</p>
						<p>Description</p>
						<p>{podcast?.summary.label}</p>
					</Link>
				</aside>
				<section>
					<div>
						<h2>{trackName}</h2>
						<em>
							<p>{description}</p>
						</em>
						<audio aria-label={`audio:${trackName}`} src={episodeUrl} controls></audio>
					</div>
				</section>
			</>
		);
	}

	return content;
};
export default Episode;
