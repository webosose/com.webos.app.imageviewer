/* eslint-disable react/jsx-no-bind */

import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from '../../../goldstone/ImageItem/ImageItem';
import {VirtualGridList} from '../../../goldstone/VirtualList/VirtualList';
import ri from '@enact/ui/resolution';
import placeHolderImg from '../../../assets/photovideo_splash.png';

const ImageList = ({imageList, handleNavigate}) => {
    const renderItem = ({index, ...rest}) => {
		let thumbPath = imageList[index].file_path;
		let encodedPath = thumbPath.replace(/ /g, '%20');

		if (thumbPath && thumbPath.substring(0, 1) === '/') {
			encodedPath = 'file:///' + encodedPath;
		}

		return (
			<ImageItem
				{...rest}
				src={encodedPath}
				placeholder={placeHolderImg}
				onClick={() => handleNavigate('/imageviewer', imageList[index], index)}
			>
				{imageList[index].title}
			</ImageItem>
		);
	};
	imageList = imageList || [];
    return (
		imageList.length === 0 ?
			<h3>No Photo, Video or folders exist in storage device</h3 > :
			<VirtualGridList
				direction='vertical'
				dataSize={imageList.length}
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(500),
					minHeight: ri.scale(500)
				}}
			/>
	);
}

ImageList.propTypes = {
	handleNavigate: PropTypes.func.isRequired,
	imageList: PropTypes.array
};

ImageList.default = {
	imageList: []
};

export default ImageList;
