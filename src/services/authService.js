import { baseApi } from './index';

// import { responseError } from '../helpers';

const authService = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: 'admin/login',
				method: 'POST',
				body,
			}),
		}),
	}),
});
export default authService;
