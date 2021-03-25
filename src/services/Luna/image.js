import luna from './request';

const imageService = {
	getImageList: ({uri, ...rest}) => {
		let params = {
			uri: uri
		};
		return luna('com.webos.service.mediaindexer', 'getImageList', params)(rest);
	},

	getImageMetaData: ({uri, ...rest}) => {
		let params = {
			uri: uri
		};
		return luna('com.webos.service.mediaindexer', 'getImageMetadata ', params)(rest);
	}
};

export default imageService;
export {
	imageService
};
