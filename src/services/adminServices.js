import { baseApi, toast } from './index';
import { responseError } from '../helpers';

const adminServices = baseApi.injectEndpoints({
	endpoints: (build) => ({
		adminList: build.query({
			query: (body) => ({
				url: '/admin/list',
				method: 'POST',
				body,
			}),

			transformResponse: baseApi.defaultTransformResponse,
			providesTags: (result) => baseApi.providesTags(result, 'adminGet'),
		}),

		adminCreate: build.mutation({
			query: (body) => ({
				url: '/admin/create',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled }) {
				queryFulfilled.then(() => {
					toast('Admin Created is Successfully!', 'success');
				});

				queryFulfilled.catch((error) => {
					toast('Failed to Create Agency!', responseError(error.error).desc, 'danger');
				});
			},
			invalidatesTags: () => ['adminGet'],
		}),

		adminGetById: build.query({
			query: (body) => ({
				url: '/admin/get',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
		}),

		adminEdit: build.mutation({
			query: (body) => ({
				url: '/admin/edit',
				method: 'POST',
				body,
			}),

			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled, dispatch }) {
				queryFulfilled.then(() => {
					dispatch(baseApi.util.resetApiState());
					toast(
						'Admin Updated is Successfully!',
						'Admin Updated is Successfully!',
						'success',
					);
				});

				queryFulfilled.catch((error) => {
					toast('Failed to Update Admin!', responseError(error.error).desc, 'danger');
				});
			},
			invalidatesTags: () => ['adminGet'],
		}),
	}),
});
export default adminServices;
