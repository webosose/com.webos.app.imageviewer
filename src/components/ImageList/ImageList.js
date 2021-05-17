/* eslint-disable react/jsx-no-bind */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ImageItem from '../../../goldstone/ImageItem/ImageItem';
import {VirtualGridList} from '../../../goldstone/VirtualList/VirtualList';
import ri from '@enact/ui/resolution';
import {setSelectedImage} from '../../actions/imageActions';
import {changePath} from '../../actions/navigationActions';
import placeHolderImg from '../../../assets/photovideo_splash.png';

const ImageGridList = ({currentImageId, imageList=[], handleNavigate, setSelectedImageId}) => {
	const updateNavigationPath = (imgIndex) => {
		console.log(imgIndex);
		handleNavigate('imageviewer');
		setSelectedImageId(imgIndex);
	}

	const getScrollTo = (scrollTo) => {
		scrollTo({animate: false, focus: true, index: currentImageId});
	};


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
				onClick={() => updateNavigationPath(index)}
			>
				{imageList[index].title}
			</ImageItem>
		);
	};
	imageList = imageList || [];
	return (
		imageList.length === 0 ?
			<h3>No photos exist in storage device</h3 > :
			<VirtualGridList
				cbScrollTo={getScrollTo}
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

const mapStateToProps = ({images}) => {
	return {
		imageList: images.imageList.results,
		currentImageId: images.currentImageId
	};
};

const ImageList = connect(
	mapStateToProps,
	{
		handleNavigate: changePath,
		setSelectedImageId: setSelectedImage
	}
)(ImageGridList);

ImageList.propTypes = {
	handleNavigate: PropTypes.func,
	imageList: PropTypes.array
};

ImageList.default = {
	imageList: []
};

export default ImageList;
