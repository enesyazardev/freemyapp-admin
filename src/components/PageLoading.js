import ContentLoader from 'react-content-loader';

const PageLoading = (props) => (
	<ContentLoader
		viewBox='0 0 400 160'
		height={500}
		width={900}
		backgroundColor='transparent'
		{...props}>
		<circle cx='150' cy='86' r='8' />
		<circle cx='194' cy='86' r='8' />
		<circle cx='238' cy='86' r='8' />
	</ContentLoader>
);

PageLoading.metadata = {
	name: 'RioF',
	github: 'clariokids',
	description: 'Three Dots',
	filename: 'ThreeDots',
};

export default PageLoading;
