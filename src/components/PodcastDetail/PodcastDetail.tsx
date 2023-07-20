import React from 'react';
import './styles.css';
import { PodcastProps } from '../../app/services/podcasts';
import { Link } from 'react-router-dom';

interface PodcastDetailProps {
	id: string;
	podcast: PodcastProps;
}

const PodcastDetail: React.FC<PodcastDetailProps> = ({ podcast, id }) => {
	return (
		<aside className="podcast-aside__detail">
			<Link to={`/podcast/${id}`}>
				<img
					src={podcast?.['im:image'][2]?.label}
					alt={podcast?.['im:name'].label}
					className="podcast-aside__image"
				/>
				<h3 className="podcast-aside__name">{podcast?.['im:name'].label}</h3>
				<em className="podcast-aside__author">by {podcast?.['im:artist'].label}</em>
				<p className="podcast-aside__description">Description: </p>
				<i>{podcast?.summary.label}</i>
			</Link>
		</aside>
	);
};

export default PodcastDetail;
