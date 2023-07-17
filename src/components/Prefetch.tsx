import { store } from '../app/store';
import { podcastsApi } from '../app/services/podcasts';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
	useEffect(() => {
		console.log('subscribing');
		const podcasts = store.dispatch(podcastsApi.endpoints.getPodcasts.initiate());

		return () => {
			console.log('unsubscribing');
			podcasts.unsubscribe();
		};
	}, []);

	return <Outlet />;
};
export default Prefetch;
