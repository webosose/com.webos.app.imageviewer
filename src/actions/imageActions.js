import LS2Request from '@enact/webos/LS2Request';
import {types} from './types';
import {Image} from '../services';
// import imagesList from '../../assets/mocks/imageList.json';

// console.log(imagesList.imageList.results)
const getCurrentImageRequest = () => {
	return {
		type: types.FETCH_CURRENT_IMAGE_REQUEST
	};
};

const setCurrentImageSuccess = (imageMetaData, index) => {
	return {
		type: types.FETCH_CURRENT_IMAGE_SUCCESS,
		payload: imageMetaData,
		index: index
	};
};

const setCurrentImageError = (message) => {
	return {
		type: types.FETCH_CURRENT_IMAGE_ERROR,
		payload: message
	};
};

const getImageListRequest = () => {
	return {
		type: types.FETCH_IMAGE_LIST_REQUEST
	};
};

const setImageListSuccess = (imageList) => {
	return {
		type: types.FETCH_IMAGE_LIST_SUCCESS,
		payload: imageList
	};
};

const setImageListError = (message) => {
	return {
		type: types.FETCH_IMAGE_LIST_ERROR,
		payload: message
	};
};

const getImageList = (uri) => (dispatch) => {
	dispatch(getImageListRequest());
	Image.getImageList({
		uri: uri,
		onSuccess: (res) => {
			const {returnValue, imageList} = res;
			if (returnValue) {
				dispatch(setImageListSuccess(imageList.results));
				// dispatch(setImageListSuccess(imagesList.imageList.results));
			}
		},
		onFailure: (err) => {
			console.log(err);
			dispatch(setImageListError(err.errorText));
		}
	});
};

const getCurrentImageMetaData = ({uri, imageIndex}) => (dispatch) => {
	dispatch(getCurrentImageRequest());
	return new LS2Request().send({
		service: 'luna://com.webos.service.mediaindexer',
		method: 'getImageMetadata',
		parameters: {uri: uri},
		onSuccess: ({metadata}) => {
			dispatch(setCurrentImageSuccess(metadata, imageIndex));
		},
		onFailure: (err) => {
			dispatch(setImageListError(err.errorText));
		}
	});
};

const setSelectedImage = (imgId) => {
	return {
		type: types.SET_SELECTED_IMAGE,
		imgId
	}
};

export {
	getCurrentImageRequest,
	setCurrentImageSuccess,
	setCurrentImageError,
	setImageListSuccess,
	setImageListError,
	getImageList,
	getCurrentImageMetaData,
	setSelectedImage
};
