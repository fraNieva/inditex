import { useEffect, useState } from 'react';
import { useGetPodcastsQuery } from '../../app/services/podcasts';
import PodcastCard from '../PodcastCard/PodcastCard';
import './styles.css';
import Search from '../Search/Search';
import { EntityId } from '@reduxjs/toolkit';

const PodcastsList = () => {
	const [search, setSearch] = useState<string>('');
	const [idsFiltered, setIdsFiltered] = useState<EntityId[]>([]);
	const count = search.length > 0 ? idsFiltered.length : 100;
	const { data, isLoading, isSuccess, isError, error } = useGetPodcastsQuery();

	useEffect(() => {
		let podcastsIdsFiltered: EntityId[] = [];
		if (data && data.entities) {
			podcastsIdsFiltered = data.ids.filter((id) => {
				const podcast = data.entities[id];
				const podcastName = podcast && podcast['im:name'].label;
				const podcastAuthor = podcast && podcast['im:artist'].label;
				if (
					podcastName?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
					podcastAuthor?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
				)
					return id;
				return null;
			});
		}
		setIdsFiltered(podcastsIdsFiltered);
	}, [search, data]);

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
			<section className="podcasts-list__container">
				<Search search={search} setSearch={setSearch} count={count} />
				{idsFiltered.map((podcastId) => {
					return <PodcastCard key={podcastId} podcastId={podcastId} />;
				})}
			</section>
		);
	}

	return content;
};

export default PodcastsList;
