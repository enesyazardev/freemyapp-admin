import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../layouts/Wrapper';
import { moneyServices } from '../../services';

import validations from '../../validations';

const MoneyCreate = () => {
	const navigate = useNavigate();
	const { useMoneyCreateMutation } = moneyServices;

	const [moneyCreate] = useMoneyCreateMutation();

	const formik = useFormik({
		initialValues: {
			title: '',
		},
		validationSchema: validations.money.create,
		onSubmit: (values) => {
			const obj = {
				title: values.title,
			};
			moneyCreate(obj);
			navigate('/money-list');
		},
	});

	return (
		<Wrapper>
			<div className='row'>
				<div className='col-md-12'>
					{/* general form elements */}

					<div className='card card-primary'>
						<div className='card-header'>
							<h3 className='card-title'>Money Create</h3>
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

export default MoneyCreate;
