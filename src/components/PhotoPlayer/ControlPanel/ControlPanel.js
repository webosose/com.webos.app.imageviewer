import React, {useCallback} from 'react';
import {$L} from '@enact/i18n/$L';
import PropTypes from 'prop-types';
import IconButton from '../../../../goldstone/IconButton/IconButton';
import componentCss from './ControlPanel.module.less';

//  A placeholder to set images.
const ControlPanel = ({iconSize = 'large', onPlaylistOpen, onZoom, rotateImage, settingsHandler, showSettings}) => {

	const clickHandler = useCallback(e => {
		const {name} = e.currentTarget;
		if (name === 'rotate') {
			settingsHandler(false);
			rotateImage();
		} else {
			settingsHandler(!showSettings);
		}
	}, [rotateImage, settingsHandler, showSettings]);

	return (
		<div className={componentCss.controlPanel} >
			<IconButton
				aria-label="Rotate"
				className={componentCss.button}
				onClick={clickHandler}
				name="rotate"
				size={iconSize}
				tooltipText="Rotate"
				title=""
			>
				rotate
			</IconButton>
			<IconButton
				aria-label="Zoom"
				className={componentCss.button}
				onClick={onZoom}
				size={iconSize}
				tooltipText="Zoom"
				title=""
			>
				zoomin
			</IconButton>
			<IconButton
				aria-label={$L('Settings')}
				className={componentCss.button}
				name="setting"
				onClick={clickHandler}
				size={iconSize}
				title=""
				tooltipProps={{'aria-hidden': true}}
				tooltipText={$L('Settings')}
			>
				gear
			</IconButton>
			<IconButton
				aria-label="Playlist"
				className={componentCss.button}
				onClick={onPlaylistOpen}
				size={iconSize}
				tooltipText="Playlist"
				title=""
			>
				list
			</IconButton>
		</div>
	);
};


ControlPanel.propTypes = {
	/**
	 * IconSize for photoPlayer Icons.
	 *
	 * @type {String}
	 * @public
	 */
	iconSize: PropTypes.string,
	/**
	 * Callback for Backgound music splay.
	 *
	 * @type {Function}
	 * @public
	 */
	musicHandler: PropTypes.func,
	/**
	 * Callback on zoom.
	 *
	 * @type {Function}
	 * @public
	 */
	onZoom: PropTypes.func,
	/**
	 * Callback on rotate.
	 *
	 * @type {Function}
	 * @public
	 */
	rotateImage: PropTypes.func,
	/**
	 * Callback on settings.
	 *
	 * @type {Function}
	 * @public
	 */
	settingsHandler: PropTypes.func,
	/**
	 * To show and hide settings.
	 *
	 * @type {Boolean}
	 * @public
	 */
	showSettings: PropTypes.bool
};

export default React.memo(ControlPanel);
