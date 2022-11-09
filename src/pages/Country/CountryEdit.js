import { useFormik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Wrapper from '../../layouts/Wrapper';
import { countryServices, languageServices } from '../../services';

import validations from '../../validations';

const CountryEdit = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data } = countryServices.useCountryGetByIdQuery({
		country_id: id,
	});

	const { data: languageData } = languageServices.useLanguageListQuery();

	console.log(data);
	const { useCountryEditMutation } = countryServices;

	const [countryEdit] = useCountryEditMutation();

	const updateMoney = React.useCallback(
		(values) => {
			const updateData = {
				country_id: id,
				...values,
			};

			if (values.title === data?.title) {
				delete updateData.title;
			}

			if (values.language_id === data?.language_id) {
				delete updateData.language_id;
			}

			if (values.status === 'true') {
				updateData.status = true;
			} else {
				updateData.status = false;
			}

			countryEdit(updateData)
				.unwrap()
				.then(() => {
					navigate('/country/list');
				});
		},
		[navigate, id, countryEdit],
	);

	const formik = useFormik({
		initialValues: {
			title: data?.title ?? '',
			status: data?.status ?? '',
			language_id: data?.language_id ?? '',
		},
		enableReinitialize: true,
		validationSchema: validations.country.edit,
		onSubmit: (values) => {
			console.log(values);
			updateMoney(values);
			navigate('/language/list');
		},
	});

	console.log(formik.values.status);

	return (
		<Wrapper>
			<div className='row'>
				<div className='col-md-12'>
					{/* general form elements */}

					<div className='card card-primary'>
						<div className='card-header'>
							<h3 className='card-title'>Country Edit</h3>
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
									<label htmlFor='full_name'>Title</label>
									<input
										type='text'
										className='form-control'
										id='title'
										placeholder='Enter Title'
										value={formik.values.title}
										onChange={formik.handleChange}
									/>
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

								<div className='form-group'>
									<label>Language</label>
									<select
										onChange={formik.handleChange}
										id='language_id'
										className='form-control'>
										{languageData?.data?.map((lang) => (
											<option
												selected={
													data?.language_id === lang?.language_id
														? true
														: false
												}
												key={lang?._id}
												value={lang?.language_id}>
												{lang?.title}
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

							{formik.errors.title ? (
								<div
									className='alert alert-danger mt-3 alert-dismissible fade show'
									role='alert'>
									<ul>
										{formik.errors.title ? <li>{formik.errors.title}</li> : ''}
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

export default CountryEdit;
