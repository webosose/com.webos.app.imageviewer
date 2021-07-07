import PropTypes from 'prop-types';
import componentCss from './ImageIndex.module.less';

const ImageIndex = ({currentIndex, length}) => {
	return (
		<div className={componentCss.imageIndex}>{currentIndex + 1}/{length}</div>
	);
};

ImageIndex.propTypes = {
	currentIndex: PropTypes.number,
	length: PropTypes.number
};

export default ImageIndex;
