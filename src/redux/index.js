import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { setupListeners } from '@reduxjs/toolkit/query';
import baseApi from '../services/baseApi';
import authSlice from './authSlice';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(baseApi.middleware),
	devTools: true,
});

setupListeners(store.dispatch);

const Store = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

Store.propTypes = {
	children: PropTypes.node.isRequired,
};

export { store, authSlice };

export default Store;
