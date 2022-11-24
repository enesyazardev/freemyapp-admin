import { baseApi, toast } from './index';
import { responseError } from '../helpers';

const faqServices = baseApi.injectEndpoints({
	endpoints: (build) => ({
		faqList: build.query({
			query: () => ({
				url: '/faq/list',
				method: 'GET',
			}),

			transformResponse: baseApi.defaultTransformResponse,
			providesTags: (result) => baseApi.providesTags(result, 'faqGet'),
		}),

		faqCreate: build.mutation({
			query: (body) => ({
				url: '/admin/faq/create',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled }) {
				queryFulfilled.then(() => {
					toast(
						'Faq Created is Successfully!',
						'Faq Created is Successfully!',
						'success',
					);
				});

				queryFulfilled.catch((error) => {
					toast('Failed to Create Faq!', responseError(error.error).desc, 'danger');
				});
			},
			invalidatesTags: () => ['faqGet'],
		}),

		/* faqGetById: build.query({
			query: (body) => ({
				url: '/faq/get',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
		}),

		faqEdit: build.mutation({
			query: (body) => ({
				url: '/admin/faq/edit',
				method: 'POST',
				body,
			}),

			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled, dispatch }) {
				queryFulfilled.then(() => {
					dispatch(baseApi.util.resetApiState());
					toast(
						'Faq Updated is Successfully!',
						'Faq Updated is Successfully!',
						'success',
					);
				});

				queryFulfilled.catch((error) => {
					toast('Failed to Update Faq!', responseError(error.error).desc, 'danger');
				});
			},
			invalidatesTags: () => ['faqGet'],
		}), */
	}),
});
export default faqServices;
