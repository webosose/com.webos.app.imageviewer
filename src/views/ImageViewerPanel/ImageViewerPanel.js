import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import {Panel} from '../../../goldstone/Panels';
import PhotoPlayer from '../../components/PhotoPlayer/PhotoPlayer';
import {changePath} from '../../actions/navigationActions';
import {getImageList} from '../../actions/imageActions';

const ImageViewerPanel = ({currentImageId, getListImage, handleNavigate, imageList=[], ...rest}) => {

    const launchParams = JSON.parse(window.PalmSystem.launchParams);
    if(launchParams && launchParams.device_uri) {
        let find_image_index_by_uri = imageList && imageList.findIndex((images, i) => images.uri === launchParams.images_uri)
        currentImageId = find_image_index_by_uri
    }
    return (
        <Panel {...rest} >
            <PhotoPlayer
              slides={imageList}
              handleNavigate={handleNavigate}
              startSlideIndex={currentImageId}
            />
        </Panel>
    )
}

const mapStateToProps = ({images}) => {
	return {
		imageList: images.imageList.results,
        currentImageId: images.currentImageId
	};
};

export default connect(
    mapStateToProps,
    {
       handleNavigate: changePath
    }
)(ImageViewerPanel);
