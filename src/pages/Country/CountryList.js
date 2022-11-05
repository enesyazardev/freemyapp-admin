import React from 'react';
import Skeleton from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Wrapper from '../../layouts/Wrapper';
import { countryServices, languageServices } from '../../services';

const CountryList = () => {
	const { data, isLoading } = countryServices.useCountryListQuery();
	const { data: languageData } = languageServices.useLanguageListQuery();
	const [query, setQuery] = React.useState('');
	const [pageNumber, setPageNumber] = React.useState(0);

	const countryPerPage = 10;
	const pagesVisited = pageNumber * countryPerPage;

	const pageCount = Math.ceil(data?.stats?.total / countryPerPage);

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	return (
		<Wrapper>
			<div className='row'>
				<div className='col-12'>
					<Link to='/country/create' className='btn btn-primary mb-3'>
						Create
					</Link>
					<div className='card'>
						<div className='card-header'>
							<h3 className='card-title'>Country List</h3>
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
										<th>Country ID</th>
										<th>Title</th>
										<th>Language</th>
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
											?.filter((country) =>
												country?.title
													?.toLowerCase()
													.includes(query.trim()),
											)
											.slice(pagesVisited, pagesVisited + countryPerPage)
											.map((d) => (
												<tr key={d?._id}>
													<td>{d?.country_id}</td>
													<td>{d?.title}</td>
													<td>
														{
															languageData?.data?.find(
																(a) =>
																	a.language_id === d.language_id,
															)?.title
														}
													</td>
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
															to={`/country/edit/${d?.country_id}`}
															className='btn btn-warning'>
															Edit
														</Link>
													</td>
												</tr>
											))
									) : (
										<tr>
											<td colSpan={3} align='center'>
												<Skeleton count={3} />
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

export default CountryList;
