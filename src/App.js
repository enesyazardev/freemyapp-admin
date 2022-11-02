import './App.css';
import Routing from './routes/Routing';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const App = () => {
	return (
		<>
			<ReactNotifications />
			<Routing />
		</>
	);
};

export default App;
