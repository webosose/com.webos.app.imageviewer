/* eslint-disable react/jsx-no-bind */

import React, {useCallback} from 'react';
import {$L} from '@enact/i18n/$L';
import PropTypes from 'prop-types';
import Icon from '@enact/sandstone/Icon/Icon';
import componentCss from './ControlPanel.module.less';

//  A placeholder to set images.
const ControlPanel = ({iconSize = 'large', onPlaylistOpen, onZoom, rotateImage, settingsHandler, showSettings}) => {

	const clickHandler = useCallback(name => {
		if (name === 'rotate') {
			settingsHandler(false);
			rotateImage();
		} else {
			settingsHandler(!showSettings);
		}
	}, [rotateImage, settingsHandler, showSettings]);

	return (
		<div className={componentCss.controlPanel} >
			<Icon
				aria-label="Rotate"
				className={componentCss.button}
				onClick={() => clickHandler('rotate')}
				name="rotate"
				size={iconSize}
				title=""
			>
				rotate
			</Icon>
			<Icon
				aria-label="Zoom"
				className={componentCss.button}
				onClick={onZoom}
				size={iconSize}
				title=""
			>
				zoomin
			</Icon>
			<Icon
				aria-label={$L('Settings')}
				className={componentCss.button}
				name="setting"
				onClick={() => clickHandler('settings')}
				size={iconSize}
				title=""
			>
				gear
			</Icon>
			<Icon
				aria-label="Playlist"
				className={componentCss.button}
				onClick={onPlaylistOpen}
				size={iconSize}
				title=""
			>
				list
			</Icon>
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
	 * Callback on onPlaylistOpen.
	 *
	 * @type {Function}
	 * @public
	 */
	onPlaylistOpen: PropTypes.func,
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
