import { Link } from 'react-router-dom';
import Wrapper from '../../layouts/Wrapper';
import { adminServices } from '../../services';
import Skeleton from 'react-loading-skeleton';

const AdminList = () => {
	const { data, isLoading } = adminServices.useAdminListQuery({
		skip: 0,
		limit: 0,
	});
	return (
		<Wrapper>
			<div className='row'>
				<div className='col-12'>
					<Link to='/admin/create' className='btn btn-primary mb-3'>
						Create
					</Link>
					<div className='card'>
						<div className='card-header'>
							<h3 className='card-title'>Admin List</h3>
							<div className='card-tools'>
								<div className='input-group input-group-sm' style={{ width: 250 }}>
									<input
										type='text'
										name='table_search'
										className='form-control float-right'
										placeholder='Search'
									/>
									<div className='input-group-append'>
										<button type='submit' className='btn btn-default'>
											<i className='fas fa-search' />
										</button>
									</div>
								</div>
							</div>
						</div>
						{/* /.card-header */}
						<div className='card-body table-responsive p-0'>
							<table className='table table-bordered table-hover text-nowrap'>
								<thead>
									<tr>
										<th>Full Name</th>
										<th>Email</th>
										<th>Status</th>
										<th>Is Root</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{!isLoading && data?.data?.length === 0 ? (
										<tr>
											<td colSpan={5} align='center'>
												NOT FOUND
											</td>
										</tr>
									) : (
										''
									)}
									{!isLoading ? (
										data?.data?.map((d) => (
											<tr key={d?._id}>
												<td>{d?.full_name}</td>
												<td>{d?.email}</td>
												<td>
													{d?.status === true ? (
														<h5>
															<span className='badge badge-pill badge-success'>
																True
															</span>
														</h5>
													) : (
														<h5>
															<span className='badge badge-pill badge-danger'>
																False
															</span>
														</h5>
													)}
												</td>

												<td>
													{d?.isRoot === true ? (
														<h5>
															<span className='badge badge-pill badge-success'>
																True
															</span>
														</h5>
													) : (
														<h5>
															<span className='badge badge-pill badge-danger'>
																False
															</span>
														</h5>
													)}
												</td>

												<td>
													<Link
														to={`/admin/edit/${d?.user_id}`}
														className='btn btn-warning'>
														Edit
													</Link>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={5} align='center'>
												<Skeleton count={5} />
											</td>
										</tr>
									)}
								</tbody>
							</table>
							<div className='card-footer clearfix'>
								<ul className='pagination pagination-sm m-0 float-right'>
									<li className='page-item'>
										<a className='page-link' href='#'>
											«
										</a>
									</li>
									<li className='page-item'>
										<a className='page-link' href='#'>
											1
										</a>
									</li>
									<li className='page-item'>
										<a className='page-link' href='#'>
											2
										</a>
									</li>
									<li className='page-item'>
										<a className='page-link' href='#'>
											3
										</a>
									</li>
									<li className='page-item'>
										<a className='page-link' href='#'>
											»
										</a>
									</li>
								</ul>
							</div>
						</div>
						{/* /.card-body */}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default AdminList;
