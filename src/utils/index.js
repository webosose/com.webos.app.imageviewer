const isUsbConnected = (deviceList, prevDevice = {}) => {
	let isAvaliable = false;
	if (JSON.stringify(prevDevice) === JSON.stringify({})) {
		return true;
	}
	deviceList.map((device) => {
		device.deviceList.some((currDevice) => {
			if (currDevice.uri === prevDevice.uri && currDevice.available) {
				isAvaliable = true;
			}
		});
	});
	return isAvaliable;
};

const savePrevDevice = (state) => {
	try {
		const serialisedState = JSON.stringify(state);
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('prevDevice', serialisedState);
		}
	} catch (e) {
		console.warn(e); // eslint-disable-line  no-console
	}
};

const loadPrevDevice = () => {
	try {
		let serialisedState;
		if (typeof window !== 'undefined') {
			serialisedState = window.localStorage.getItem('prevDevice');
		}
		if (serialisedState === null) return {};
		return JSON.parse(serialisedState);
	} catch (e) {
		console.warn(e); // eslint-disable-line  no-console
		return {};
	}
};

export {
	isUsbConnected,
	loadPrevDevice,
	savePrevDevice
};
