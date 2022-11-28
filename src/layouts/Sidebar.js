import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
	const routePath = useLocation();

	return (
		<aside className='main-sidebar sidebar-dark-primary elevation-4'>
			{/* Brand Logo */}
			<a href='/' className='brand-link'>
				<img
					src='/AdminLTELogo.png'
					alt='AdminLTE Logo'
					className='brand-image img-circle elevation-3'
					style={{ opacity: '.8' }}
				/>

				<span className='brand-text font-weight-light'>Free My App</span>
			</a>
			{/* Sidebar */}
			<div className='sidebar'>
				{/* Sidebar user panel (optional) */}
				<div className='user-panel mt-3 pb-3 mb-3 d-flex'>
					<div className='image'>
						<img
							src='/user2-160x160.jpg'
							className='img-circle elevation-2'
							alt='sds'
						/>
					</div>
					<div className='info'>
						<Link to='/' className='d-block'>
							Alexander Pierce
						</Link>
					</div>
				</div>

				{/* Sidebar Menu */}
				<nav className='mt-2'>
					<ul
						className='nav nav-pills nav-sidebar flex-column'
						data-widget='treeview'
						role='menu'
						data-accordion='false'>
						{/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
						<li className='nav-item'>
							<Link
								to='/'
								className={
									routePath.pathname === '/' ? 'nav-link active' : 'nav-link'
								}>
								<i className='nav-icon fas fa-home' />
								<p>Dashboard</p>
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								to='/admin/list'
								className={
									routePath.pathname === '/admin/list'
										? 'nav-link active'
										: 'nav-link'
								}>
								<i className='nav-icon fas fa-users-cog' />
								<p>Admin Management</p>
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								to='/user/list'
								className={
									routePath.pathname === '/user/list'
										? 'nav-link active'
										: 'nav-link'
								}>
								<i className='nav-icon fas fa-users' />
								<p>User Management</p>
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								to='/money/list'
								className={
									routePath.pathname === '/money/list'
										? 'nav-link active'
										: 'nav-link'
								}>
								<i className='nav-icon fas fa-money-check-alt' />
								<p>Money Management</p>
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								to='/language/list'
								className={
									routePath.pathname === '/language/list'
										? 'nav-link active'
										: 'nav-link'
								}>
								<i className='nav-icon fas fa-language' />
								<p>Language Management</p>
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								to='/country/list'
								className={
									routePath.pathname === '/country/list'
										? 'nav-link active'
										: 'nav-link'
								}>
								<i className='nav-icon far fa-flag' />
								<p>Country Management</p>
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								to='/faq/list'
								className={
									routePath.pathname === '/faq/list'
										? 'nav-link active'
										: 'nav-link'
								}>
								<i className='nav-icon fas fa-question-circle' />
								<p>FAQ Management</p>
							</Link>
						</li>
					</ul>
				</nav>
				{/* /.sidebar-menu */}
			</div>
			{/* /.sidebar */}
		</aside>
	);
};

export default Sidebar;
