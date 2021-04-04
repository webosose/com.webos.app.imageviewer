/* eslint-disable react-hooks/exhaustive-deps */

import React, {useCallback, useRef, useState} from 'react';
import classNames from 'classnames';
import Image from '@enact/ui/Image';
import PropTypes from 'prop-types';

import {getHeight} from '../util/util';
import {useSettingsContext} from '../Context/SettingsContext';
import onErrorImg from '../../../../assets/photovideo_splash.png';
import cssComponet from './Slide.module.less';

const Slide = ({currentSlide, slideDirection, fallBackImg = onErrorImg, index, setNextSlide, split, url, width, rotation = 0}) => {
	const [isImageFailed, setImageFailed] = useState(false);
	const imageSrc = url
	const sliceRef = useRef();
	const stateSettingsContext = useSettingsContext();
	const contextSettingsState = stateSettingsContext.state || stateSettingsContext;
	const {currentSettings: {Size, Transition}} = contextSettingsState;
	const height = getHeight();

	const style = {
		minWidth: `${width}px`,
		transform: Transition !== 'Flip' && `rotate(${rotation}deg)`,
		...((Size === 'Full' && [90, 270].includes(rotation)) ? {backgroundSize: `${height}px auto`} : {})
	};

	const grid = 4;
	const delay = 0.05;

	const createDiv = () => {

		let divs = [];
		for (let row = 0; row < grid; row++) {
			const currentWidth = row * width / grid + 'px';
			const styles = {
				left: currentWidth,
				top: 0,
				width: `${width / grid}px`,
				height: `${height}px`,
				backgroundImage: `url(${imageSrc})`,
				backgroundPosition: `-${currentWidth}`,
				backgroundSize: `${width}px`,
				delay: `${row * delay}s`
			};
			const div = <div className={'split'} style={styles} key={row} />;
			divs.push(div);
		}
		return divs;
	};

	const playNext = (e) => {
		const {className} = e.target;
		if (className.includes('split') && split) {
			if (slideDirection === 'right') {
				setNextSlide(currentSlide + 1);
			} else if (slideDirection === 'left') {
				setNextSlide(currentSlide - 1);
			}
		}
	};

	const onImgError = useCallback(() => {
		setImageFailed(true);
	}, []);
	return (
		<Image
			ref={sliceRef}
			onTransitionEnd={(Transition === 'Split' && playNext) ? (Transition === 'Split' && playNext) : undefined}
			key={currentSlide}
			sizing={Size === 'Full' ? 'fill' : 'none'}
			src={isImageFailed ? fallBackImg : imageSrc}
			className={classNames({
				[cssComponet['slide']]: Size === 'Full',
				[cssComponet['side']]: Transition === 'Flip',
				[cssComponet['front']]: Transition === 'Flip' && (index === 0),
				[cssComponet['back']]: Transition === 'Flip' && (index !== 0),
				[cssComponet['slice']]: Transition === 'Split',
				[cssComponet['active']]: split
			})}
			style={style}
			onError={onImgError}
		>
			{Transition === 'Split' && createDiv()}
		</Image>
	);
};

Slide.propTypes = {
	/**
	 * Current slide value.
	 *
	 * @type {Number}
	 * @public
	 */
	currentSlide: PropTypes.number,
	/**
	 * Current slide value.
	 *
	 * @type {Number}
	 * @public
	 */
	fallBackImg: PropTypes.string,
	/**
	 * Current slide index.
	 *
	 * @type {Number}
	 * @public
	 */
	index: PropTypes.number,
	/**
	 * Slider direction.
	 *
	 * @type {Number}
	 * @public
	 */
	rotation: PropTypes.number,
	/**
	 * Callback on next slide value change
	 *
	 * @type {Number}
	 * @public
	 */
	setNextSlide: PropTypes.func,
	/**
	 * Split Transition
	 *
	 * @type {Boolean}
	 * @public
	 */
	split: PropTypes.bool,
	/**
	 * Slide URL
	 *
	 * @type {String}
	 * @public
	 */
	url: PropTypes.string,
	/**
	 * Split width
	 *
	 * @type {Number}
	 * @public
	 */
	width: PropTypes.number
};

export default Slide;
