import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetEpisodesQuery } from '../../app/services/episodes';
import { selectAllPodcasts } from '../../app/services/podcasts';
import { useSelector } from 'react-redux';
import EpisodeItem from '../EpisodeItem/EpisodeItem';
import './styles.css';
import PodcastDetail from '../PodcastDetail/PodcastDetail';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Podcast = () => {
	const { id } = useParams();
	const podcastsList = useSelector((state: any) => selectAllPodcasts(state));
	const podcast = podcastsList.find((podcast) => podcast.slug === id);

	const { data, isSuccess, isError, error } = useGetEpisodesQuery({
		id: podcast?.id as string,
	});

	let content = <></>;

	if (isError) {
		if ('status' in error) {
			const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

			content = <ErrorMessage errorMsg={errMsg} />;
		} else {
			content = <ErrorMessage errorMsg={error.message || ''} />;
		}
	}

	if (isSuccess && podcast && id) {
		content = (
			<div className="podcast__container">
				<PodcastDetail podcast={podcast} id={id} />
				<section className="podcast-section">
					<div className="podcast-episodes__container">
						<p className="podcast-episodes__text">
							Episodes: {data.entities['resultsCount']?.resultsCount}
						</p>
					</div>
					<div className="podcast-episodes-items__container">
						<table className="podcast-episodes__table">
							<thead className="table__thead">
								<tr>
									<th scope="col" className="table__th">
										Title
									</th>
									<th scope="col" className="table__th">
										Date
									</th>
									<th scope="col" className="table__th duration">
										Duration
									</th>
								</tr>
							</thead>
							<tbody>
								{id &&
									data.ids
										.filter((id) => typeof id === 'number')
										.map((episodeId: any) => (
											<EpisodeItem
												key={episodeId}
												podcastId={id}
												trackName={data.entities[episodeId]?.trackName}
												episodeSlug={data.entities[episodeId]?.slug}
												duration={data.entities[episodeId]?.trackTimeMillis}
												releaseDate={data.entities[episodeId]?.releaseDate}
											/>
										))}
							</tbody>
						</table>
					</div>
				</section>
			</div>
		);
	}

	return content;
};

export default Podcast;
