import {combineReducers} from 'redux';
import imageListReducer from './imageReducer';
import deviceReducer from './deviceReducer';
import path from './navigationReducer';

const rootReducer = combineReducers({
	devices: deviceReducer,
	images: imageListReducer,
	path: path
});

export default rootReducer;
