import React from 'react';
import { Link } from 'react-router-dom';

interface EpisodeItemProps {
	id: number;
	podcastId: string;
	trackName?: string;
	episodeSlug?: string;
}

const EpisodeItem = ({ id, podcastId, trackName, episodeSlug }: EpisodeItemProps) => {
	return (
		<p>
			<Link to={`/podcast/${podcastId}/episode/${episodeSlug}`}>
				<span>{trackName}</span>
			</Link>
		</p>
	);
};

export default EpisodeItem;
