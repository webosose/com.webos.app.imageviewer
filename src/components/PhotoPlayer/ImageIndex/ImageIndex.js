import React from 'react';
import componentCss from './ImageIndex.module.less';

const ImageIndex = ({currentIndex, length}) => {
	return (
		<div className={componentCss.imageIndex}>{currentIndex + 1}/{length}</div>
	);
};

export default ImageIndex;
