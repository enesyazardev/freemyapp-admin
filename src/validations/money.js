import * as Yup from 'yup';

const create = Yup.object().shape({
	title: Yup.string().required('Title is required').min(2, 'Title enter a minimum of 2!'),
});

export default { create };
