import { Store } from 'react-notifications-component';

const settings = {
	insert: 'top',
	container: 'top-right',
	animationIn: ['animate__animated', 'animate__fadeIn'],
	animationOut: ['animate__animated', 'animate__fadeOut'],
	dismiss: {
		duration: 7000,
		pauseOnHover: true,
		onScreen: true,
		showIcon: true,
		waitForAnimation: false,
	},
};

/**
 *
 * @param {string} title
 * @param {string} message
 * @param {string} _type 'default' || 'info' || 'warning' || 'success' || 'danger',
 * @param {object} setOptions
 */
const showNotification = (title, message, _type = 'default') => {
	Store.addNotification({
		title: title ?? 'FreeMyApp',
		message,
		type: _type,
		...settings,
	});
};

export default showNotification;
