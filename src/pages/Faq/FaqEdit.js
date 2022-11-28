import { useFormik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Wrapper from '../../layouts/Wrapper';
import { countryServices, faqServices } from '../../services';

import validations from '../../validations';

const FaqEdit = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data } = faqServices.useFaqGetByIdQuery({
		faq_id: id,
	});

	console.log(data);

	const { data: countryData } = countryServices.useCountryListQuery();

	const { useFaqEditMutation } = faqServices;

	const [faqEdit] = useFaqEditMutation();

	const updateFaq = React.useCallback(
		(values) => {
			const updateData = {
				faq_id: id,
				update: {
					[values.country_id]: {
						question: values.question,
						answer: values.answer,
					},
				},
				status: true,
			};

			/* if (values.question === data?.faq_data[Object.keys(data?.faq_data)]?.question) {
				delete updateData.update[values.country_id].question;
			}

			if (values.answer === data?.faq_data[Object.keys(data?.faq_data)]?.answer) {
				delete updateData.update[values.country_id].answer;
			} */

			if (values.status === data?.status) {
				delete updateData.status;
			}

			if (values.status === 'true') {
				updateData.status = true;
			} else {
				updateData.status = false;
			}

			faqEdit(updateData)
				.unwrap()
				.then(() => {
					navigate('/faq/list');
				});
		},
		[navigate, id, faqEdit],
	);

	const formik = useFormik({
		initialValues: {
			question: data?.faq_data[Object.keys(data?.faq_data)]?.question ?? '',
			country_id: Object.keys(data?.faq_data || {})[0] ?? '',
			answer: data?.faq_data[Object.keys(data?.faq_data)]?.answer ?? '',
		},
		enableReinitialize: true,
		validationSchema: validations.faq.create,
		onSubmit: (values) => {
			updateFaq(values);
		},
	});

	return (
		<Wrapper>
			<div className='row'>
				<div className='col-md-12'>
					{/* general form elements */}

					<div className='card card-primary'>
						<div className='card-header'>
							<h3 className='card-title'>FAQ Edit</h3>
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
										value={formik.values.question}
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
										value={formik.values.answer}
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
										{countryData?.data?.map((d) => (
											<option
												selected={
													Object.keys(data?.faq_data || {})[0] ===
													d?.country_id
														? true
														: false
												}
												key={d?._id}
												value={d?.country_id}>
												{d.title}
											</option>
										))}
									</select>
								</div>
								<div className='form-group'>
									<label>Status</label>
									<select
										onChange={formik.handleChange}
										defaultValue={data?.status}
										id='status'
										className='form-control'>
										<option
											value={true}
											selected={data?.status === true ? true : false}>
											True
										</option>
										<option
											value={false}
											selected={data?.status === false ? true : false}>
											False
										</option>
									</select>
								</div>
							</div>
							{/* /.card-body */}
							<div className='card-footer'>
								<button type='submit' className='btn btn-primary'>
									Submit
								</button>
							</div>

							{formik.errors.question || formik.errors.answer ? (
								<div
									className='alert alert-danger mt-3 alert-dismissible fade show'
									role='alert'>
									<ul>
										{formik.errors.question ? (
											<li>{formik.errors.question}</li>
										) : (
											''
										)}
										{formik.errors.answer ? (
											<li>{formik.errors.answer}</li>
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

export default FaqEdit;
