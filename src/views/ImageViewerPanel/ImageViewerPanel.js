import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import {Panel} from '../../../goldstone/Panels';
import PhotoPlayer from '../../components/PhotoPlayer/PhotoPlayer'

const ImageViewerPanel = ({imageList, ...rest}) => {
    return (
        <Panel {...rest} >
            <PhotoPlayer  slides={imageList} />
        </Panel>
    )
}

const mapStateToProps = ({images}) => {
	return {
		imageList: images.imageList.results
	};
};

export default connect(mapStateToProps, null)(ImageViewerPanel);
