import * as Yup from 'yup';

const create = Yup.object().shape({
	full_name: Yup.string()
		.required('Full Name is required')
		.min(3, 'Full Name enter a minimum of 3!'),
	email: Yup.string().email('Please enter in the email format.').required('Email is required'),
	password: Yup.string().required('Password is required').min(6, 'You can enter a minimum of 6!'),
	status: Yup.array().required('Status is required'),
	isRoot: Yup.array().required('Is Root is required'),
});

const edit = Yup.object().shape({
	full_name: Yup.string()
		.required('Full Name is required')
		.min(3, 'Full Name enter a minimum of 3!'),
	// password: Yup.string().required('Password is required').min(6, 'You can enter a minimum of 6!'),
	status: Yup.string().required('Status is required'),
	isRoot: Yup.string().required('Is Root is required'),
});

export default { create, edit };
