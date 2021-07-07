/* eslint-disable react-hooks/exhaustive-deps */

import {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Panel} from '@enact/sandstone/Panels';
import PhotoPlayer from '../../components/PhotoPlayer/PhotoPlayer';
import {changePath} from '../../actions/navigationActions';
import {setSelectedImage} from '../../actions/imageActions';
import css from './ImageViewerPanel.module.less';

const ImageViewerPanel = ({currentImageId, handleNavigate, imageList = [], setSelectedImageId, ...rest}) => {
	let launchParams = JSON.parse(window.PalmSystem.launchParams);

	useEffect(() => {
		if (launchParams && launchParams.imageList && launchParams.imageList.image_uri !== '') {
			let findImageIndexByUri = launchParams.imageList && launchParams.imageList.results.findIndex((images) => images.uri === launchParams.imageList.image_uri);
			if (findImageIndexByUri === -1) {
				setSelectedImageId(0);
			} else {
				setSelectedImageId(findImageIndexByUri);
			}
			launchParams.imageList.image_uri = ''; // eslint-disable-line camelcase
		}
		window.PalmSystem.launchParams = JSON.stringify(launchParams);
	}, []);

	return (
		<Panel {...rest} css={css}>
			<PhotoPlayer
				className={css.noPaddingPanel}
				slides={imageList}
				handleNavigate={handleNavigate}
				startSlideIndex={currentImageId}
			/>
		</Panel>
	);
};

ImageViewerPanel.propTypes = {
	currentImageId: PropTypes.number,
	handleNavigate: PropTypes.func,
	imageList: PropTypes.array,
	setSelectedImageId: PropTypes.func
};

const mapStateToProps = ({images}) => {
	return {
		imageList: images.imageList,
		currentImageId: images.currentImageId
	};
};

export default connect(
	mapStateToProps,
	{
		handleNavigate: changePath,
		setSelectedImageId: setSelectedImage
	}
)(ImageViewerPanel);
