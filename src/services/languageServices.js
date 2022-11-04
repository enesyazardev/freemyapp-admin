import { baseApi, toast } from './index';
import { responseError } from '../helpers';

const languageServices = baseApi.injectEndpoints({
	endpoints: (build) => ({
		languageList: build.query({
			query: () => ({
				url: '/language/list',
				method: 'GET',
			}),

			transformResponse: baseApi.defaultTransformResponse,
			providesTags: (result) => baseApi.providesTags(result, 'languageGet'),
		}),

		languageCreate: build.mutation({
			query: (body) => ({
				url: '/admin/language/create',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled }) {
				queryFulfilled.then(() => {
					toast(
						'Language Created is Successfully!',
						'Language Created is Successfully!',
						'success',
					);
				});

				queryFulfilled.catch((error) => {
					toast('Failed to Create Language!', responseError(error.error).desc, 'danger');
				});
			},
			invalidatesTags: () => ['languageGet'],
		}),

		languageGetById: build.query({
			query: (body) => ({
				url: '/language/get',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
		}),

		languageEdit: build.mutation({
			query: (body) => ({
				url: '/admin/language/edit',
				method: 'POST',
				body,
			}),

			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled, dispatch }) {
				queryFulfilled.then(() => {
					dispatch(baseApi.util.resetApiState());
					toast(
						'Language Updated is Successfully!',
						'Language Updated is Successfully!',
						'success',
					);
				});

				queryFulfilled.catch((error) => {
					toast('Failed to Update Language!', responseError(error.error).desc, 'danger');
				});
			},
			invalidatesTags: () => ['languageGet'],
		}),
	}),
});
export default languageServices;
