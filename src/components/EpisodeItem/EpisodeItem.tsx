import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { msToTime } from '../../utils/helpers';
import './styles.css';

interface EpisodeItemProps {
	id: number;
	podcastId: string;
	trackName?: string;
	episodeSlug?: string;
	duration?: number;
	releaseDate?: string;
}

const EpisodeItem = ({
	id,
	podcastId,
	trackName,
	episodeSlug,
	duration = 0,
	releaseDate = '',
}: EpisodeItemProps) => {
	const trackDateCreation = useMemo(
		() => new Date(releaseDate).toLocaleDateString(),
		[releaseDate]
	);

	return (
		<tr className="episode__row">
			<td className="episode__name">
				<Link to={`/podcast/${podcastId}/episode/${episodeSlug}`}>
					<span>{trackName}</span>
				</Link>
			</td>
			<td className="episode__creation-date">
				<span>{trackDateCreation}</span>
			</td>
			<td className="episode__duration">
				<span>{msToTime(duration)}</span>
			</td>
		</tr>
	);
};

export default EpisodeItem;
