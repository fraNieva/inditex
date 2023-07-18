import { useGetPodcastsQuery } from '../../app/services/podcasts';
import PodcastCard from '../PodcastCard/PodcastCard';
import './styles.css';

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
			<section className="podcasts-list__container">
				{data.ids.map((podcastId) => {
					return <PodcastCard key={podcastId} podcastId={podcastId} />;
				})}
			</section>
		);
	}

	return content;
};

export default PodcastsList;
