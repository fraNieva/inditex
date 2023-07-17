import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';

const Layout = () => {
	const isSomeQueryPending = useSelector((state: RootState) =>
		Object.values(state.api.queries).some((query) => query?.status === 'pending')
	);
	return (
		<>
			<header style={{ display: 'flex' }}>
				<Link to="/">
					<h1>Podcaster</h1>
				</Link>
				{isSomeQueryPending && <span>loading...</span>}
			</header>
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
