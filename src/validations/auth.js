import * as Yup from 'yup';

// giriş için validation şeması
const login = Yup.object().shape({
	email: Yup.string().email('Please enter in the email format.').required('email is required'),
	password: Yup.string().required('password is required').min(6, 'You can enter a minimum of 6!'),
});

export default { login };
