import React, {useEffect} from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import {Panel} from '../../../goldstone/Panels';
import PhotoPlayer from '../../components/PhotoPlayer/PhotoPlayer';
import {changePath} from '../../actions/navigationActions';
import {setSelectedImage} from '../../actions/imageActions';

const ImageViewerPanel = ({currentImageId, getListImage, handleNavigate, imageList=[], setImages, setSelectedImageId, ...rest}) => {

    let launchParams = JSON.parse(window.PalmSystem.launchParams);
    useEffect(() => {
        if(launchParams && launchParams.imageList && launchParams.imageList?.image_uri !== '') {
            let find_image_index_by_uri = launchParams.imageList && launchParams.imageList.results.findIndex((images) => images.uri === launchParams.imageList.image_uri)
            find_image_index_by_uri === -1 ? setSelectedImageId(0) : setSelectedImageId(find_image_index_by_uri)
            launchParams.imageList.image_uri = ''
        }
        window.PalmSystem.launchParams = JSON.stringify(launchParams)
    }, [])

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
