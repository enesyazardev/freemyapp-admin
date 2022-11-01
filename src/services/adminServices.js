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
			invalidatesTags: () => ['adminGet'],
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
			invalidatesTags: () => ['adminGet'],
		}),

		adminGetById: build.query({
			query: (body) => ({
				url: '/agency/get',
				method: 'POST',
				body,
			}),
			transformResponse: baseApi.defaultTransformResponse,
		}),  */
	}),
});
export default adminServices;
