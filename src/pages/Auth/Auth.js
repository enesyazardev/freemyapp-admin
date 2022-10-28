import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authSlice from '../../redux/authSlice';
import { authService } from '../../services';
import validations from '../../validations';

const Auth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { useLoginMutation } = authService;

	const [login, response] = useLoginMutation();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validations.auth.login,
		onSubmit: (values) => {
			login({
				email: values.email,
				password: values.password,
			});
		},
	});

	console.log(formik.errors);

	React.useEffect(() => {
		if (response?.isSuccess) {
			localStorage.setItem('token', response?.data?.result?.token);
			dispatch(authSlice.setToken(response?.data?.result?.token));
			navigate('/');
		}
	}, [response?.isSuccess]);

	return (
		<section className='hold-transition login-page'>
			<div className='login-box'>
				<div className='login-logo'>
					<a href='/'>
						<b>Free My App</b>
					</a>
				</div>
				{/* /.login-logo */}
				<div className='card'>
					<div className='card-body login-card-body'>
						<form
							onSubmit={(event) => {
								event.preventDefault();
								formik.handleSubmit();
							}}>
							<div className='input-group mb-3'>
								<input
									id='email'
									className='form-control'
									placeholder='Email'
									onChange={formik.handleChange}
								/>
								<div className='input-group-append'>
									<div className='input-group-text'>
										<span className='fas fa-envelope' />
									</div>
								</div>
							</div>
							<div className='input-group mb-3'>
								<input
									id='password'
									type='password'
									className='form-control'
									placeholder='Password'
									onChange={formik.handleChange}
								/>
								<div className='input-group-append'>
									<div className='input-group-text'>
										<span className='fas fa-lock' />
									</div>
								</div>
							</div>
							<div className='row'>
								{/* /.col */}
								<div className='col-4'>
									<button
										type='submit'
										disabled={response?.isLoading ? true : false}
										className='btn btn-primary btn-block'>
										{response?.isLoading ? 'loading...' : 'Sign In'}
									</button>
								</div>
								{/* /.col */}
							</div>
							{response?.isError ? (
								<div
									className='alert alert-danger mt-3 alert-dismissible fade show'
									role='alert'>
									{response?.error?.data?.desc}
								</div>
							) : (
								''
							)}
							{formik.errors.email || formik.errors.password ? (
								<div
									className='alert alert-danger mt-3 alert-dismissible fade show'
									role='alert'>
									<ul>
										{formik.errors.email ? <li>{formik.errors.email}</li> : ''}
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
					{/* /.login-card-body */}
				</div>
			</div>
		</section>
	);
};

export default Auth;
