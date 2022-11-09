import { useFormik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Wrapper from '../../layouts/Wrapper';
import { userServices } from '../../services';

import validations from '../../validations';

const UserEdit = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data } = userServices.useUserGetByIdQuery({
		user_id: id,
	});

	console.log(data);
	const { useUserEditMutation } = userServices;

	const [userEdit] = useUserEditMutation();

	const updateAdmin = React.useCallback(
		(values) => {
			const updateData = {
				user_id: id,
				...values,
			};

			if (values.full_name === data?.full_name) {
				delete updateData.full_name;
			}

			if (values.password === '') {
				delete updateData.password;
			}

			userEdit(updateData)
				.unwrap()
				.then(() => {
					navigate('/user/list');
				});
		},
		[navigate, id, userEdit],
	);

	const formik = useFormik({
		initialValues: {
			full_name: data?.full_name ?? '',
			password: '',
		},
		enableReinitialize: true,
		validationSchema: validations.user.edit,
		onSubmit: (values) => {
			updateAdmin(values);
		},
	});

	return (
		<Wrapper>
			<div className='row'>
				<div className='col-md-12'>
					{/* general form elements */}

					<div className='card card-primary'>
						<div className='card-header'>
							<h3 className='card-title'>User Edit</h3>
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
									<label htmlFor='full_name'>Full Name</label>
									<input
										type='text'
										className='form-control'
										id='full_name'
										placeholder='Enter Full Name'
										value={formik.values.full_name}
										onChange={formik.handleChange}
									/>
								</div>

								<div className='form-group'>
									<label htmlFor='password'>Password</label>
									<input
										type='text'
										className='form-control'
										id='password'
										placeholder='Enter Password'
										value={formik.values.password}
										onChange={formik.handleChange}
									/>
								</div>
							</div>
							{/* /.card-body */}
							<div className='card-footer'>
								<button type='submit' className='btn btn-primary'>
									Submit
								</button>
							</div>

							{formik.errors.email ||
							formik.errors.password ||
							formik.errors.full_name ||
							formik.errors.status ||
							formik.errors.isRoot ? (
								<div
									className='alert alert-danger mt-3 alert-dismissible fade show'
									role='alert'>
									<ul>
										{formik.errors.email ? <li>{formik.errors.email}</li> : ''}
										{formik.errors.full_name ? (
											<li>{formik.errors.full_name}</li>
										) : (
											''
										)}
										{formik.errors.status ? (
											<li>{formik.errors.status}</li>
										) : (
											''
										)}
										{formik.errors.isRoot ? (
											<li>{formik.errors.isRoot}</li>
										) : (
											''
										)}
										{formik.errors.password ? (
											<li>{formik.errors.password}</li>
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

export default UserEdit;
