import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { RootState } from '../../app/store';
import './styles.css';
import Spinner from '../Spinner/Spinner';

const Layout: React.FC = () => {
	const isSomeQueryPending = useSelector((state: RootState) =>
		Object.values(state.api.queries).some((query) => query?.status === 'pending')
	);
	return (
		<>
			<header className="header">
				<Link to="/" className="header-logo">
					<h1>Podcaster</h1>
				</Link>
				{isSomeQueryPending && <Spinner />}
			</header>
			<main className="main">
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
