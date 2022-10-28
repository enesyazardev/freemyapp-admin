import { createSlice } from '@reduxjs/toolkit';

const adminStorage = localStorage.getItem('token');

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: adminStorage || null,
	},
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
		},
		logout: (state) => {
			localStorage.removeItem('token');
			state.token = null;
		},
	},
});

export default {
	...authSlice,
	...authSlice.actions,
};
