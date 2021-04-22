/* eslint-disable react/jsx-no-bind */

import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from '../../../../goldstone/ImageItem/ImageItem';
import {VirtualGridList} from '../../../../goldstone/VirtualList/VirtualList';
import ri from '@enact/ui/resolution';
import placeHolderImg from '../../../../assets/photovideo_splash.png';

const ImagePlayList = ({imageList, updateCurrentIndex}) => {
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
				onClick={() => updateCurrentIndex(index)}
			/>
		);
	};
	imageList = imageList || [];
    return (
		imageList.length === 0 ?
			<h3>No Photo, Video or folders exist in storage device</h3 > :
			<VirtualGridList
				direction='horizontal'
				dataSize={imageList.length}
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(300),
					minHeight: ri.scale(200)
				}}
				spacing={ri.scale(0.2)}
			/>
	);
}

ImagePlayList.propTypes = {
	imageList: PropTypes.array
};

ImagePlayList.default = {
	imageList: []
};

export default ImagePlayList;
