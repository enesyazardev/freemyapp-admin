/* eslint-disable react/prop-types */
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const Wrapper = ({ children }) => {
	return (
		<div className='wrapper'>
			<Header />
			<Sidebar />
			<div className='content-wrapper'>
				{/* Content Header (Page header) */}
				<div className='content-header'>
					<div className='container-fluid'>{children}</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Wrapper;
