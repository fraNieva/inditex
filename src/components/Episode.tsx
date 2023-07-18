import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EpisodeProps, useGetEpisodesQuery } from '../app/services/episodes';
import { selectAllPodcasts } from '../app/services/podcasts';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

const Episode = () => {
	const { id, episodeId } = useParams();
	const [podcastId, setPodcastId] = useState<string | undefined>(undefined);

	const podcastsList = useSelector((state: any) => selectAllPodcasts(state));
	const podcast = podcastsList.find((podcast) => podcast.slug === id);

	const podcastIdNumber = typeof podcast?.id === 'string' ? podcast.id : '';
	const { data, isLoading, isSuccess, isError, error } = useGetEpisodesQuery({
		id: podcastId,
	});

	useEffect(() => {
		if (podcastIdNumber) setPodcastId(podcastIdNumber);
	}, [podcastIdNumber]);

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
	if (isSuccess && episodeId && data) {
		console.log(episodeId);
		console.log(data);
		const episodeIdNumber = data.ids.filter((id) => episodeId === data.entities[id]?.slug)[0];
		console.log('episodeIdNumber :>> ', episodeIdNumber);
		const { description, trackName, episodeUrl } = data.entities[episodeIdNumber] as EpisodeProps;

		content = (
			<>
				<aside>
					<Link to={`/podcast/${id}`}>
						<img src={podcast?.['im:image'].at(-1)?.label} alt={podcast?.['im:name'].label} />
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
							<p>{description && parse(description)}</p>
						</em>
						<audio
							typeof="audio/mp3"
							aria-label={`audio:${trackName}`}
							src={episodeUrl}
							controls
							itemRef={`audio:${trackName}`}
						></audio>
					</div>
				</section>
			</>
		);
	}

	return content;
};
export default Episode;
