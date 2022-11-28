import React from 'react';
import Skeleton from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Wrapper from '../../layouts/Wrapper';
import { faqServices } from '../../services';

const FaqList = () => {
	const { data, isLoading } = faqServices.useFaqListQuery();

	// const faqData = data?.data?.map((d) => d.faq_data[Object.keys(d.faq_data)]).map((a) => a);
	const faqData = data?.data?.map((d) => {
		return { faq_id: d.faq_id, status: d.status, faq: d.faq_data[Object.keys(d.faq_data)] };
	});

	const [query, setQuery] = React.useState('');
	const [pageNumber, setPageNumber] = React.useState(0);

	const faqPerPage = 10;
	const pagesVisited = pageNumber * faqPerPage;

	const pageCount = Math.ceil(data?.stats?.total / faqPerPage);

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	return (
		<Wrapper>
			<div className='row'>
				<div className='col-12'>
					<Link to='/faq/create' className='btn btn-primary mb-3'>
						Create
					</Link>
					<div className='card'>
						<div className='card-header'>
							<h3 className='card-title'>Faq List</h3>
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
										<th>Faq ID</th>
										<th>Question</th>
										<th>Answer</th>
										<th>Status</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{!isLoading && faqData.length === 0 ? (
										<tr>
											<td colSpan={3} align='center'>
												NOT FOUND
											</td>
										</tr>
									) : (
										''
									)}
									{!isLoading ? (
										faqData
											?.filter((faq) =>
												faq?.faq?.answer
													?.toLowerCase()
													.includes(query.trim()),
											)
											.slice(pagesVisited, pagesVisited + faqPerPage)
											.map((d) => (
												<tr key={d?._id}>
													<td>{d?.faq_id}</td>
													<td>{d?.faq?.question}</td>
													<td>{d?.faq?.answer}</td>
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
															to={`/faq/edit/${d?.faq_id}`}
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
							</div>
						</div>
						{/* /.card-body */}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default FaqList;
