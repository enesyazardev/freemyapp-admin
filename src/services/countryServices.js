import { baseApi, toast } from './index';
import { responseError } from '../helpers';

const countryServices = baseApi.injectEndpoints({
	endpoints: (build) => ({
		countryList: build.query({
			query: () => ({
				url: '/country/list',
				method: 'GET',
			}),

			transformResponse: baseApi.defaultTransformResponse,
			providesTags: (result) => baseApi.providesTags(result, 'countryGet'),
		}),

		countryCreate: build.mutation({
			query: (body) => ({
				url: '/admin/country/create',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled }) {
				queryFulfilled.then(() => {
					toast(
						'Country Created is Successfully!',
						'Country Created is Successfully!',
						'success',
					);
				});

				queryFulfilled.catch((error) => {
					toast('Failed to Create Country!', responseError(error.error).desc, 'danger');
				});
			},
			invalidatesTags: () => ['countryGet'],
		}),

		countryGetById: build.query({
			query: (body) => ({
				url: '/country/get',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
		}),

		countryEdit: build.mutation({
			query: (body) => ({
				url: '/admin/country/edit',
				method: 'POST',
				body,
			}),

			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled, dispatch }) {
				queryFulfilled.then(() => {
					dispatch(baseApi.util.resetApiState());
					toast(
						'Country Updated is Successfully!',
						'Country Updated is Successfully!',
						'success',
					);
				});

				queryFulfilled.catch((error) => {
					toast('Failed to Update Country!', responseError(error.error).desc, 'danger');
				});
			},
			invalidatesTags: () => ['countryGet'],
		}),
	}),
});
export default countryServices;
