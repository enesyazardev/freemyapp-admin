import * as Yup from 'yup';

const create = Yup.object().shape({
	title: Yup.string().required('Title is required').min(2, 'Title enter a minimum of 2!'),
	language_id: Yup.string().required('Language is required'),
});

const edit = Yup.object().shape({
	title: Yup.string().required('Title is required').min(2, 'Title enter a minimum of 2!'),
	language_id: Yup.string().required('Language is required'),
	status: Yup.string().required('Status is required'),
});

export default { create, edit };
