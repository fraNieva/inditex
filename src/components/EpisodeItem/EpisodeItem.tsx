import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { msToTime } from '../../utils/helpers';
import './styles.css';

interface EpisodeItemProps {
	podcastId: string;
	trackName?: string;
	episodeSlug?: string;
	duration?: number;
	releaseDate?: string;
}

const EpisodeItem = ({
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

	const durationInMMSS = useMemo(() => msToTime(duration), [duration]);

	return (
		<tr className="episode__row">
			<td className="episode__name" data-testid="episode__name">
				<Link to={`/podcast/${podcastId}/episode/${episodeSlug}`}>
					<span>{trackName}</span>
				</Link>
			</td>
			<td className="episode__creation-date" data-testid="episode__date">
				<span>{trackDateCreation}</span>
			</td>
			<td className="episode__duration">
				<span data-testid="episode__duration">{durationInMMSS}</span>
			</td>
		</tr>
	);
};

export default EpisodeItem;
