import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetEpisodesQuery } from '../app/services/episodes';
import { selectPodcastById } from '../app/services/podcasts';
import { useSelector } from 'react-redux';
import EpisodeItem from './EpisodeItem';

const Podcast = () => {
	const { id } = useParams();
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

	if (isSuccess) {
		content = (
			<>
				<aside>
					<img src={podcast?.['im:image'][0].label} alt={podcast?.['im:name'].label} />
					<p>{podcast?.['im:name'].label}</p>
					<p>by {podcast?.['im:artist'].label}</p>
					<p>Description</p>
					<p>{podcast?.summary.label}</p>
				</aside>
				<section>
					<p>Episodes: {data.entities['resultsCount']?.resultsCount}</p>
					<div className="episode-items-container">
						{id &&
							Object.keys(data.entities).map((episodeId: any) => (
								<EpisodeItem
									key={episodeId}
									id={episodeId.toString()}
									podcastId={id}
									trackName={data.entities[episodeId]?.trackName}
								/>
							))}
					</div>
				</section>
			</>
		);
	}
	return content;
};

export default Podcast;
