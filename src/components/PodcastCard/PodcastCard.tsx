import React from 'react';
import { selectPodcastById } from '../../app/services/podcasts';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.css';

const PodcastCard = ({ podcastId }: any) => {
	const podcast = useSelector((state: any) => selectPodcastById(state, podcastId || ''));
	return (
		<Link to={`podcast/${podcast?.slug}`} className="podcast-card__container">
			<img
				src={podcast?.['im:image'][1].label}
				alt={podcast?.['im:name'].label}
				className="podcast-card__image"
			/>
			<div className="podcast-card__item">
				<h3 className="podcast-card__title">{podcast?.['im:name'].label}</h3>
				<p className="podcast-card__author">Author: {podcast?.['im:artist'].label}</p>
			</div>
		</Link>
	);
};

export default PodcastCard;
