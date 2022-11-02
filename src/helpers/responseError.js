import { backendResponse } from '../constants';

/**
 *
 * @param {object} response response objesinde mutlaka errorCode ve httpStatus olmalıdr.
 * @returns {object} response değeri ile aynı sonucu sadece desc değeri farklı döner.
 */
export default function responseError(response) {
	const error = backendResponse.find((errorMessage) => {
		if (
			errorMessage.errorCode === response?.errorCode &&
			errorMessage.httpStatus === response?.httpStatus
		) {
			return errorMessage;
		}
		return null;
	});
	if (error) {
		return {
			desc: error.desc,
			errorCode: error.errorCode,
			httpStatus: error.httpStatus,
		};
	}
	return {
		desc: '',
		errorCode: 0,
		httpStatus: 0,
	};
}
