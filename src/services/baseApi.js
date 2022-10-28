import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

let baseUrl = 'http://130.185.118.232:5998/';

// eslint-disable-next-line no-undef
if (process.env.REACT_APP_ENV === 'production') baseUrl = 'http://130.185.118.232:5998/';

const appService = createApi({
	reducerPath: 'appService',
	refetchOnReconnect: true,
	baseQuery: fetchBaseQuery({
		baseUrl,
		prepareHeaders: (headers, { getState }) => {
			headers.set('Authorization', getState().auth.token);
			return headers;
		},
	}),
	endpoints: () => ({}),
});

const defaultTransformResponse = (response) => response.result;

const providesTags = (result, type, idKey = '_id') => {
	return result?.length
		? [...result.map((item) => ({ type, id: item[idKey] })), { type, id: 'LIST' }]
		: [{ type, id: 'LIST' }];
};

const invalidatesTags = (type, id) => {
	if (Array.isArray(type)) {
		if (id) return type.map((t) => ({ type: t, id }));
		return type.map((t) => ({ type: t, id: 'LIST' }));
	}
	if (id) return [{ type, id }];
	return [{ type, id: 'LIST' }];
};

export default {
	...appService,
	providesTags,
	invalidatesTags,
	defaultTransformResponse,
};
