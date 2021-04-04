import React from 'react';
import PropTypes from 'prop-types';

import PhotoPlayerBase from './PhotoPlayerBase';
import {SettingsProvider} from './Context/SettingsContext';

const PhotoPlayer = ({slideDirection, slides, startSlideIndex}) => {
	return (
		<SettingsProvider>
			<PhotoPlayerBase slides={slides} startSlideIndex={startSlideIndex} slideDirection={slideDirection} />
		</SettingsProvider>
	);
};

PhotoPlayer.propTypes = {
	slideDirection: PropTypes.string,
	slides: PropTypes.array
};

export default PhotoPlayer;
