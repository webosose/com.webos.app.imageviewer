import PropTypes from 'prop-types';

import PhotoPlayerBase from './PhotoPlayerBase';
import {SettingsProvider} from './Context/SettingsContext';

const PhotoPlayer = ({handleNavigate, slideDirection, slides, startSlideIndex}) => {
	return (
		<SettingsProvider>
			<PhotoPlayerBase
				handleNavigate={handleNavigate}
				slides={slides}
				startSlideIndex={startSlideIndex}
				slideDirection={slideDirection}
			/>
		</SettingsProvider>
	);
};

PhotoPlayer.propTypes = {
	handleNavigate: PropTypes.func,
	slideDirection: PropTypes.string,
	slides: PropTypes.array,
	startSlideIndex: PropTypes.number
};

export default PhotoPlayer;
