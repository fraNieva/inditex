import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<header>
				<Link to="/">
					<h1>Podcaster</h1>
				</Link>
			</header>
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
