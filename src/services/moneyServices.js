import { baseApi, toast } from './index';
import { responseError } from '../helpers';

const moneyServices = baseApi.injectEndpoints({
	endpoints: (build) => ({
		moneyList: build.query({
			query: () => ({
				url: '/money/list',
				method: 'GET',
			}),

			transformResponse: baseApi.defaultTransformResponse,
			providesTags: (result) => baseApi.providesTags(result, 'moneyGet'),
		}),

		moneyCreate: build.mutation({
			query: (body) => ({
				url: '/admin/money/create',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled }) {
				queryFulfilled.then(() => {
					toast(
						'Money Created is Successfully!',
						'Money Created is Successfully!',
						'success',
					);
				});

				queryFulfilled.catch((error) => {
					toast('Failed to Create Money!', responseError(error.error).desc, 'danger');
				});
			},
			invalidatesTags: () => ['moneyGet'],
		}),

		moneyGetById: build.query({
			query: (body) => ({
				url: '/money/get',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
		}),

		moneyEdit: build.mutation({
			query: (body) => ({
				url: '/admin/money/edit',
				method: 'POST',
				body,
			}),

			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled, dispatch }) {
				queryFulfilled.then(() => {
					dispatch(baseApi.util.resetApiState());
					toast(
						'Money Updated is Successfully!',
						'Money Updated is Successfully!',
						'success',
					);
				});

				queryFulfilled.catch((error) => {
					toast('Failed to Update Money!', responseError(error.error).desc, 'danger');
				});
			},
			invalidatesTags: () => ['moneyGet'],
		}),
	}),
});
export default moneyServices;
