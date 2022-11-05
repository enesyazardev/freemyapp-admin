import React from 'react';
import Skeleton from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Wrapper from '../../layouts/Wrapper';
import { languageServices } from '../../services';

const LanguageList = () => {
	const { data, isLoading } = languageServices.useLanguageListQuery();
	const [query, setQuery] = React.useState('');
	const [pageNumber, setPageNumber] = React.useState(0);

	const languagePerPage = 10;
	const pagesVisited = pageNumber * languagePerPage;

	const pageCount = Math.ceil(data?.stats?.total / languagePerPage);

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	return (
		<Wrapper>
			<div className='row'>
				<div className='col-12'>
					<Link to='/language/create' className='btn btn-primary mb-3'>
						Create
					</Link>
					<div className='card'>
						<div className='card-header'>
							<h3 className='card-title'>Language List</h3>
							<div className='card-tools'>
								<div className='input-group input-group-sm' style={{ width: 250 }}>
									<input
										type='text'
										name='table_search'
										className='form-control float-right'
										placeholder='Search'
										onChange={(e) => setQuery(e.target.value)}
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
										<th>Language ID</th>
										<th>Title</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{!isLoading && data?.data?.length === 0 ? (
										<tr>
											<td colSpan={3} align='center'>
												NOT FOUND
											</td>
										</tr>
									) : (
										''
									)}
									{!isLoading ? (
										data?.data
											?.filter((lang) =>
												lang?.title?.toLowerCase().includes(query.trim()),
											)
											.slice(pagesVisited, pagesVisited + languagePerPage)
											.map((d) => (
												<tr key={d?._id}>
													<td>{d?.language_id}</td>
													<td>{d?.title}</td>
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
														<Link
															to={`/language/edit/${d?.language_id}`}
															className='btn btn-warning'>
															Edit
														</Link>
													</td>
												</tr>
											))
									) : (
										<tr>
											<td colSpan={4} align='center'>
												<Skeleton count={4} />
											</td>
										</tr>
									)}
								</tbody>
							</table>
							<div className='card-footer clearfix'>
								<ReactPaginate
									className='pagination pagination-sm m-0 float-right'
									previousLabel='<'
									nextLabel='>'
									breakLabel='...'
									pageCount={pageCount}
									onPageChange={changePage}
									containerClassName='pagination'
									pageClassName='page-item'
									pageLinkClassName='page-link'
									previousClassName='page-item'
									previousLinkClassName='page-link'
									nextClassName='page-item'
									nextLinkClassName='page-link'
									breakClassName='page-item'
									breakLinkClassName='page-link'
									activeClassName='active'
								/>
								{/* <ul className='pagination pagination-sm m-0 float-right'>
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
								</ul> */}
							</div>
						</div>
						{/* /.card-body */}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default LanguageList;
