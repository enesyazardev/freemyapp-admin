import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const Private = ({ children }) => {
	const { token } = useSelector((state) => state.auth);
	return token ? children : <Navigate to='/login' />;
};

export default Private;
