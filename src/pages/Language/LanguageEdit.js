import { useFormik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Wrapper from '../../layouts/Wrapper';
import { languageServices } from '../../services';

import validations from '../../validations';

const LanguageEdit = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data } = languageServices.useLanguageGetByIdQuery({
		language_id: id,
	});
	const { useLanguageEditMutation } = languageServices;

	const [languageEdit] = useLanguageEditMutation();

	const updateMoney = React.useCallback(
		(values) => {
			const updateData = {
				language_id: id,
				...values,
			};

			if (values.title === data?.title) {
				delete updateData.title;
			}

			if (values.status === data?.status) {
				delete updateData.status;
			}

			if (values.status === 'true') {
				updateData.status = true;
			} else {
				updateData.status = false;
			}

			languageEdit(updateData)
				.unwrap()
				.then(() => {
					navigate('/language/list');
				});
		},
		[navigate, id, languageEdit],
	);

	const formik = useFormik({
		initialValues: {
			title: data?.title ?? '',
			status: data?.status ?? '',
		},
		enableReinitialize: true,
		validationSchema: validations.money.create,
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
							<h3 className='card-title'>Language Edit</h3>
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

export default LanguageEdit;
