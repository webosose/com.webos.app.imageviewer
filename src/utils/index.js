const isUsbConnected = (deviceList, prevDevice={}) => {
	let isAvaliable = false
    if(JSON.stringify(prevDevice) === JSON.stringify({})) {
		return true
	}
	deviceList.map((device) => {
        device.deviceList.some((deviceList) =>{
            if(deviceList.uri === prevDevice.uri && deviceList.available) {
                isAvaliable = true
            }
        })
    })
    return isAvaliable
}

const savePrevDevice = (state) => {
	try {
		const serialisedState = JSON.stringify(state);
		if (typeof window !== 'undefined') {
			window.localStorage.setItem("prevDevice", serialisedState);
		}
	} catch (e) {
		console.warn(e);
	}
}

const loadPrevDevice = () => {
	try {
		let serialisedState
		if (typeof window !== 'undefined') {
			serialisedState = window.localStorage.getItem("prevDevice");
		}
		if (serialisedState === null) return undefined;
		return JSON.parse(serialisedState);
	} catch (e) {
		console.warn(e);
		return undefined;
	}
}

export {
	isUsbConnected,
	loadPrevDevice,
	savePrevDevice
}