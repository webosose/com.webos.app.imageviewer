import {types} from '../actions/types';


const initialState = {
	imageList: [],
	imageListError: '',
	isImageListLoading: false
};

const imageListReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_IMAGE_LIST_REQUEST: {
			return {
				...state,
				isImageListLoading: true,
				imageList: [],
				imageListError: ''
			};
		}
		case types.FETCH_IMAGE_LIST_SUCCESS: {
			return {
				...state,
				isImageListLoading: false,
				imageList: action.payload,
				imageListError: ''
			};
		}
		case types.FETCH_IMAGE_LIST_ERROR: {
			return {
				...state,
				isImageListLoading: false,
				imageList: [],
				imageListError: action.payload
			};
		}
		default: return state;
	}
};

export default imageListReducer;
