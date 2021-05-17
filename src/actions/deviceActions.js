import {types} from './types';
import {Device} from '../services';
import {setImageListSuccess} from './imageActions';
import {changePath} from './navigationActions';
import {isUsbConnected, savePrevDevice} from '../utils/index';

const getDeviceListRequest = () => {
	return {
		type: types.FETCH_DEVICE_LIST_REQUEST
	};
};

const setDeviceListSuccess = (deviceList) => {
	return {
		type: types.FETCH_DEVICE_LIST_SUCCESS,
		payload: deviceList
	};
};

const setDeviceListError = (errMessage) => {
	return {
		type: types.FETCH_DEVICE_LIST_ERROR,
		payload: errMessage
	};
};

const getDeviceList = () => (dispatch, getState) => {
	dispatch(getDeviceListRequest());
	Device.getDeviceList({
		subscribe: true,
		onSuccess: (res) => {
			dispatch(changePath('home'))
			if(!isUsbConnected(res.pluginList, getState().devices.currentDevice)) {
				dispatch(setImageListSuccess([]));
				savePrevDevice({})
			}
			dispatch(setDeviceListSuccess(res.pluginList));
		},
		onFailure: (err) => {
			dispatch(setDeviceListError(err));
		}
	});
};

const setCurrentDevice = (device) => {
	savePrevDevice(device)
	return {
		type: types.SET_CURRENT_DEVICE,
		device
	}
};

export {
	getDeviceList,
	setDeviceListSuccess,
	setDeviceListError,
	setCurrentDevice
};
