import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Private from './Private';
import Public from './Public';

const Auth = React.lazy(() => import('../pages/Auth/Auth'));
const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard'));

const Routing = () => {
	return (
		<BrowserRouter>
			<React.Suspense fallback={<div>loading...</div>}>
				<Routes>
					<Route
						path='/'
						element={
							<Private>
								<Dashboard />
							</Private>
						}
					/>
					<Route
						path='login'
						element={
							<Public>
								<Auth />
							</Public>
						}
					/>
				</Routes>
			</React.Suspense>
		</BrowserRouter>
	);
};

export default Routing;
