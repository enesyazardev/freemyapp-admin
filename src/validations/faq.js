import * as Yup from 'yup';

const create = Yup.object().shape({
	country_id: Yup.string().required('Country is required'),
	question: Yup.string().required('Question is required'),
	answer: Yup.string().required('Answer is required'),
});

export default { create };
