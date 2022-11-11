import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLoading from '../components/PageLoading';
import Private from './Private';
import Public from './Public';

const Auth = React.lazy(() => import('../pages/Auth/Auth'));
const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard'));
const AdminList = React.lazy(() => import('../pages/Admin/AdminList'));
const AdminCreate = React.lazy(() => import('../pages/Admin/AdminCreate'));
const AdminEdit = React.lazy(() => import('../pages/Admin/AdminEdit'));
const MoneyList = React.lazy(() => import('../pages/Money/MoneyList'));
const MoneyCreate = React.lazy(() => import('../pages/Money/MoneyCreate'));
const MoneyEdit = React.lazy(() => import('../pages/Money/MoneyEdit'));
const LanguageList = React.lazy(() => import('../pages/Language/LanguageList'));
const LanguageCreate = React.lazy(() => import('../pages/Language/LanguageCreate'));
const LanguageEdit = React.lazy(() => import('../pages/Language/LanguageEdit'));
const CountryList = React.lazy(() => import('../pages/Country/CountryList'));
const CountryCreate = React.lazy(() => import('../pages/Country/CountryCreate'));
const CountryEdit = React.lazy(() => import('../pages/Country/CountryEdit'));
const UserList = React.lazy(() => import('../pages/User/UserList'));
const UserEdit = React.lazy(() => import('../pages/User/UserEdit'));
const PageNotFound = React.lazy(() => import('../components/PageNotFound'));

const Routing = () => {
	return (
		<BrowserRouter>
			<React.Suspense fallback={<PageLoading />}>
				<Routes>
					<Route path='*' element={<PageNotFound />} />
					<Route
						path='/'
						element={
							<Private>
								<Dashboard />
							</Private>
						}
					/>
					<Route
						path='admin/list'
						element={
							<Private>
								<AdminList />
							</Private>
						}
					/>
					<Route
						path='admin/create'
						element={
							<Private>
								<AdminCreate />
							</Private>
						}
					/>
					<Route
						path='admin/edit/:id'
						element={
							<Private>
								<AdminEdit />
							</Private>
						}
					/>
					<Route
						path='money/list'
						element={
							<Private>
								<MoneyList />
							</Private>
						}
					/>
					<Route
						path='money/create'
						element={
							<Private>
								<MoneyCreate />
							</Private>
						}
					/>
					<Route
						path='money/edit/:id'
						element={
							<Private>
								<MoneyEdit />
							</Private>
						}
					/>
					<Route
						path='language/list'
						element={
							<Private>
								<LanguageList />
							</Private>
						}
					/>
					<Route
						path='language/create'
						element={
							<Private>
								<LanguageCreate />
							</Private>
						}
					/>
					<Route
						path='language/edit/:id'
						element={
							<Private>
								<LanguageEdit />
							</Private>
						}
					/>
					<Route
						path='country/list'
						element={
							<Private>
								<CountryList />
							</Private>
						}
					/>
					<Route
						path='country/create'
						element={
							<Private>
								<CountryCreate />
							</Private>
						}
					/>
					<Route
						path='country/edit/:id'
						element={
							<Private>
								<CountryEdit />
							</Private>
						}
					/>
					<Route
						path='user/list'
						element={
							<Private>
								<UserList />
							</Private>
						}
					/>
					<Route
						path='user/edit/:id'
						element={
							<Private>
								<UserEdit />
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
