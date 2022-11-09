import * as Yup from 'yup';

const edit = Yup.object().shape({
	full_name: Yup.string()
		.required('Full Name is required')
		.min(3, 'Full Name enter a minimum of 3!'),
	// password: Yup.string().required('Password is required').min(6, 'You can enter a minimum of 6!'),
});

export default { edit };
