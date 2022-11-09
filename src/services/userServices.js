import { baseApi, toast } from './index';
import { responseError } from '../helpers';

const userServices = baseApi.injectEndpoints({
	endpoints: (build) => ({
		userList: build.query({
			query: (body) => ({
				url: '/admin/user/list',
				method: 'POST',
				body,
			}),

			transformResponse: baseApi.defaultTransformResponse,
			providesTags: (result) => baseApi.providesTags(result, 'userGet'),
		}),

		userGetById: build.query({
			query: (body) => ({
				url: '/admin/user/get',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
		}),

		userEdit: build.mutation({
			query: (body) => ({
				url: '/admin/user/edit',
				method: 'POST',
				body,
			}),

			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled, dispatch }) {
				queryFulfilled.then(() => {
					dispatch(baseApi.util.resetApiState());
					toast(
						'User Updated is Successfully!',
						'User Updated is Successfully!',
						'success',
					);
				});

				queryFulfilled.catch((error) => {
					toast('Failed to Update User!', responseError(error.error).desc, 'danger');
				});
			},
			invalidatesTags: () => ['userGet'],
		}),
	}),
});
export default userServices;
