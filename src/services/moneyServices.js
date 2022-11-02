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

		/* agencyEdit: build.mutation({
			query: (body) => ({
				url: '/agency/edit',
				method: 'POST',
				body,
			}),

			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled, dispatch }) {
				queryFulfilled.then(() => {
					dispatch(baseApi.util.resetApiState());
					toast(
						i18n.t('serviceToastMessage.success.agencyUpdate'),
						i18n.t('serviceToastMessage.success.agencyUpdate'),
						'success',
					);
				});

				queryFulfilled.catch((error) => {
					toast(
						i18n.t('serviceToastMessage.error.agencyUpdate'),
						responseError(error.error).desc,
						'danger',
					);
				});
			},
			invalidatesTags: () => ['moneyGet'],
		}),

		agencyDelete: build.mutation({
			query: (body) => ({
				url: '/agency/delete',
				method: 'DELETE',
				body,
			}),

			transformResponse: baseApi.defaultTransformResponse,
			onQueryStarted(body, { queryFulfilled }) {
				queryFulfilled.then(() => {
					toast(
						i18n.t('serviceToastMessage.success.agencyDelete'),
						i18n.t('serviceToastMessage.success.agencyDelete'),
						'success',
					);
				});

				queryFulfilled.catch((error) => {
					toast(
						i18n.t('serviceToastMessage.error.agencyDelete'),
						responseError(error.error).desc,
						'danger',
					);
				});
			},
			invalidatesTags: () => ['moneyGet'],
		}),

		moneyGetById: build.query({
			query: (body) => ({
				url: '/agency/get',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
		}),  */
	}),
});
export default moneyServices;
