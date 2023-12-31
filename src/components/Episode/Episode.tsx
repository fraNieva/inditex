import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EpisodeProps, useGetEpisodesQuery } from '../../app/services/episodes';
import { selectAllPodcasts } from '../../app/services/podcasts';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import PodcastDetail from '../PodcastDetail/PodcastDetail';
import './styles.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { RootState } from '../../app/store';

const Episode: React.FC = () => {
	const { id, episodeId } = useParams();
	const [podcastId, setPodcastId] = useState<string | undefined>(undefined);

	const podcastsList = useSelector((state: RootState) => selectAllPodcasts(state));
	const podcast = podcastsList.find((podcast) => podcast.slug === id);

	const podcastIdNumber = typeof podcast?.id === 'string' ? podcast.id : '';

	const { data, isSuccess, isError, error } = useGetEpisodesQuery({
		id: podcastId,
	});

	useEffect(() => {
		if (podcastIdNumber) setPodcastId(podcastIdNumber);
	}, [podcastIdNumber]);

	let content = <></>;

	if (isError) {
		if ('status' in error) {
			const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

			content = content = <ErrorMessage errorMsg={errMsg} />;
		} else {
			content = <ErrorMessage errorMsg={error.message || ''} />;
		}
	}

	if (isSuccess && episodeId && data && podcast && id) {
		const episodeIdNumber = data.ids.filter((id) => episodeId === data.entities[id]?.slug)[0];
		const { description, trackName, episodeUrl } = data.entities[episodeIdNumber] as EpisodeProps;

		content = (
			<div className="episode__container">
				<PodcastDetail podcast={podcast} id={id} />
				<section className="episode__section">
					<div className="episode__information-container">
						<h2 className="episode__information-title">{trackName}</h2>
						<em>
							<p>{description && parse(description)}</p>
						</em>
						<audio
							className="episode__information-audio"
							typeof="audio/mp3"
							aria-label={`audio:${trackName}`}
							src={episodeUrl}
							controls
							itemRef={`audio:${trackName}`}
						></audio>
					</div>
				</section>
			</div>
		);
	}

	return content;
};
export default Episode;
