import { useFormik } from 'formik';
import Wrapper from '../../layouts/Wrapper';
import { adminServices } from '../../services';

import validations from '../../validations';

const AdminCreate = () => {
	const { useAdminCreateMutation } = adminServices;

	const [adminCreate] = useAdminCreateMutation();

	const formik = useFormik({
		initialValues: {
			email: '',
			full_name: '',
			password: '',
			status: '',
			isRoot: '',
		},
		validationSchema: validations.admin.create,
		onSubmit: (values) => {
			const obj = {
				email: values.email,
				full_name: values.full_name,
				password: values.password,
				isRoot: values.isRoot.includes('on') ? true : false,
				status: values.status.includes('on') ? true : false,
				permissions: [],
			};
			adminCreate(obj);
		},
	});

	return (
		<Wrapper>
			<div className='row'>
				<div className='col-md-12'>
					{/* general form elements */}
					<div className='card card-primary'>
						<div className='card-header'>
							<h3 className='card-title'>Admin Create</h3>
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
										onChange={formik.handleChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='email'>Email Address</label>
									<input
										type='email'
										className='form-control'
										id='email'
										placeholder='Enter Email'
										onChange={formik.handleChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='password'>Password</label>
									<input
										type='password'
										className='form-control'
										id='password'
										placeholder='Password'
										onChange={formik.handleChange}
									/>
								</div>
								<div className='form-group'>
									<div className='custom-control custom-switch custom-switch-off-danger custom-switch-on-success'>
										<input
											type='checkbox'
											className='custom-control-input'
											id='status'
											onChange={formik.handleChange}
										/>
										<label className='custom-control-label' htmlFor='status'>
											User Status (Disable/Enable)
										</label>
									</div>
								</div>
								<div className='form-group'>
									<div className='custom-control custom-switch custom-switch-off-danger custom-switch-on-success'>
										<input
											type='checkbox'
											className='custom-control-input'
											id='isRoot'
											onChange={formik.handleChange}
										/>
										<label className='custom-control-label' htmlFor='isRoot'>
											Is Root (No/Yes)
										</label>
									</div>
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

export default AdminCreate;
