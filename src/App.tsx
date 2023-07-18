import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PodcastsList from './components/PodcastsList/PodcastsList';
import Podcast from './components/Podcast';
import Episode from './components/Episode';
import Prefetch from './components/Prefetch';
import './App.css';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route element={<Prefetch />}>
					<Route index element={<PodcastsList />} />
					<Route path="/podcast/:id" element={<Podcast />} />
					<Route path="/podcast/:id/episode/:episodeId" element={<Episode />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
