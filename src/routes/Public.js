import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const Public = ({ children }) => {
	const { token } = useSelector((state) => state.auth);
	return token ? <Navigate to='/' /> : children;
};

export default Public;
