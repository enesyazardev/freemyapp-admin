import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../layouts/Wrapper';
import { countryServices, faqServices } from '../../services';

import validations from '../../validations';

const FaqCreate = () => {
	const navigate = useNavigate();

	const { data } = countryServices.useCountryListQuery();
	console.log(data);

	const { useFaqCreateMutation } = faqServices;

	const [faqCreate] = useFaqCreateMutation();

	const formik = useFormik({
		initialValues: {
			question: '',
			country_id: '',
			answer: '',
		},
		validationSchema: validations.faq.create,
		onSubmit: (values) => {
			console.log(values);
			const country_id = values.country_id;
			const obj = {
				[country_id]: {
					question: values.question,
					answer: values.answer,
				},
			};

			faqCreate(obj);
			navigate('/faq/list');
		},
	});

	return (
		<Wrapper>
			<div className='row'>
				<div className='col-md-12'>
					{/* general form elements */}

					<div className='card card-primary'>
						<div className='card-header'>
							<h3 className='card-title'>Country Create</h3>
						</div>
						{/* /.card-header */}
						{/* form start */}
						<form
							onSubmit={(event) => {
								event.preventDefault();
								formik.handleSubmit();
							}}>
							<div className='card-body'>
								<div className='form-group'>
									<label htmlFor='question'>Question</label>
									<input
										type='text'
										className='form-control'
										id='question'
										placeholder='Enter Question'
										onChange={formik.handleChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='answer'>Answer</label>
									<input
										type='text'
										className='form-control'
										id='answer'
										placeholder='Enter Answer'
										onChange={formik.handleChange}
									/>
								</div>
								<div className='form-group'>
									<label>Country</label>
									<select
										onChange={formik.handleChange}
										id='country_id'
										className='form-control'>
										<option>Country Select</option>
										{data?.data?.map((d) => (
											<option key={d?._id} value={d?.country_id}>
												{d.title}
											</option>
										))}
									</select>
								</div>
							</div>
							{/* /.card-body */}
							<div className='card-footer'>
								<button type='submit' className='btn btn-primary'>
									Submit
								</button>
							</div>

							{formik.errors.title || formik.errors.language_id ? (
								<div
									className='alert alert-danger mt-3 alert-dismissible fade show'
									role='alert'>
									<ul>
										{formik.errors.title ? <li>{formik.errors.title}</li> : ''}
										{formik.errors.language_id ? (
											<li>{formik.errors.language_id}</li>
										) : (
											''
										)}
									</ul>
								</div>
							) : (
								''
							)}
						</form>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default FaqCreate;
