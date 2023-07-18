import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetEpisodesQuery } from '../../app/services/episodes';
import { selectAllPodcasts } from '../../app/services/podcasts';
import { useSelector } from 'react-redux';
import EpisodeItem from '../EpisodeItem';
import './styles.css';

const Podcast = () => {
	const { id } = useParams();
	const podcastsList = useSelector((state: any) => selectAllPodcasts(state));

	const podcast = podcastsList.find((podcast) => podcast.slug === id);

	const { data, isLoading, isSuccess, isError, error } = useGetEpisodesQuery({
		id: podcast?.id as string,
	});

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
			<div className="podcast__container">
				<aside className="podcast-aside__detail">
					<img
						src={podcast?.['im:image'].at(-1)?.label}
						alt={podcast?.['im:name'].label}
						className="podcast-aside__image"
					/>
					<h3 className="podcast-aside__name">{podcast?.['im:name'].label}</h3>
					<em className="podcast-aside__author">by {podcast?.['im:artist'].label}</em>
					<p className="podcast-aside__description">Description: </p>
					<i>{podcast?.summary.label}</i>
				</aside>
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
									Object.keys(data.entities).map((episodeId: any) => (
										<EpisodeItem
											key={episodeId}
											id={episodeId.toString()}
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
