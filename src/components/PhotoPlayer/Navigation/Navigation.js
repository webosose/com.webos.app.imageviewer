import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '../../../../goldstone/IconButton/IconButton';
import componentCss from './Navigation.module.less';

const Navigation = ({iconSize = 'large', isPlaying = true, leftIconClick, rigthIconClick, togglePlay}) => {
	return (
		<div className={componentCss.navigationWrapper} >
			<IconButton
				className={componentCss.icon}
				disabled={isPlaying}
				iconOnly
				onClick={leftIconClick}
				size={iconSize}
				title=""
			>
				jumpbackward
			</IconButton>
			<IconButton
				className={componentCss.icon}
				iconOnly
				onClick={togglePlay}
				size={iconSize}
				title=""
			>
				{isPlaying ? 'pause' : 'play'}
			</IconButton>
			<IconButton
				className={componentCss.icon}
				disabled={isPlaying}
				iconOnly
				onClick={rigthIconClick}
				size={iconSize}
				title=""
			>
				jumpforward
			</IconButton>
		</div>
	);
};


Navigation.propTypes = {
	/**
	 * Size of the Icons.
	 *
	 * @type {String}
	 * @public
	 */
	iconSize: PropTypes.string,

	/**
	 * Callback for letfIcon.
	 *
	 * @type {String}
	 * @public
	 */

	leftIconClick: PropTypes.func,
	/**
	 * Callback for rightIcon.
	 *
	 * @type {String}
	 * @public
	 */

	rigthIconClick: PropTypes.func,
	/**
	 * Callback for toggleButton.
	 *
	 * @type {String}
	 * @public
	 */

	togglePlay: PropTypes.func
};

export default React.memo(Navigation);
