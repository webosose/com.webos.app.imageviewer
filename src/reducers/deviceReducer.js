import {types} from '../actions/types';
import {loadPrevDevice} from '../utils/index';


let prevDevice = loadPrevDevice;

const initialState = {
	isLoading: false,
	deviceList: [],
	currentDevice: prevDevice || {},
	error: ''
};

const deviceListReducer = (state = initialState, action) => {
	console.log('action', action)
	switch (action.type) {
		case types.FETCH_DEVICE_LIST_REQUEST : {
			return {
				...state,
				isLoading: true,
				deviceList: [],
				error: ''
			};
		}
		case types.FETCH_DEVICE_LIST_SUCCESS: {
			return {
				...state,
				isLoading: false,
				deviceList: action.payload,
				error: ''
			};
		}
		case types.FETCH_DEVICE_LIST_ERROR: {
			return {
				...state,
				isLoading: true,
				deviceList: [],
				error: action.payload
			};
		}
		case types.SET_CURRENT_DEVICE: {
			return {
				...state,
				currentDevice: action.device
			};
		}
		default: return state;
	}
};

export default deviceListReducer;
