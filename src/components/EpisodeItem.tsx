import React from 'react';
import { Link } from 'react-router-dom';

interface EpisodeItemProps {
	id: number;
	podcastId: string;
	trackName?: string;
}

const EpisodeItem = ({ id, podcastId, trackName }: EpisodeItemProps) => {
	return (
		<p>
			<Link to={`/podcast/${podcastId}/episode/${id}`}>
				<span>{trackName}</span>
			</Link>
		</p>
	);
};

export default EpisodeItem;
