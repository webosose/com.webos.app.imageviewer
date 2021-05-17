import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import {Panel} from '../../../goldstone/Panels';
import PhotoPlayer from '../../components/PhotoPlayer/PhotoPlayer';
import {changePath} from '../../actions/navigationActions';

const ImageViewerPanel = ({currentImageId, imageList=[], handleNavigate, ...rest}) => {
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

const mapDispatchToState = dispatch => {
	return {
		handleNavigate: (path) => dispatch(changePath(path)),
	};
};

export default connect(mapStateToProps, mapDispatchToState)(ImageViewerPanel);
