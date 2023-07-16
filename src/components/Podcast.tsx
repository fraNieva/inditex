import React from 'react';
import { useParams } from 'react-router-dom';

const Podcast = () => {
	const { id } = useParams();
	console.log('id :>> ', id);
	return <div>Podcast</div>;
};

export default Podcast;
