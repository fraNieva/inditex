import React from 'react';
import { selectPodcastById } from '../app/services/podcasts';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PodcastCard = ({ podcastId }: any) => {
	const podcast = useSelector((state: any) => selectPodcastById(state, podcastId || ''));
	return (
		<Link to={`podcast/${podcastId}`}>
			<>
				<p>{podcast?.['im:name'].label}</p>
				<img src={podcast?.['im:image'][0].label} alt={podcast?.['im:name'].label} />
				<p>Author: {podcast?.['im:artist'].label}</p>
			</>
		</Link>
	);
};

export default PodcastCard;
