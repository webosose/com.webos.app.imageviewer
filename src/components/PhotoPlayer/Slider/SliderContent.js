import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useSettingsContext} from '../Context/SettingsContext';
import componentCss from './SliderContent.module.less';
import {getWidth} from '../util/util';

const SliderContent = ({children, direction, isFlipped, translate, transition, width}) => {
	const stateSettingsContext = useSettingsContext();
	const contextSettingsState = stateSettingsContext.state || stateSettingsContext;
	const {currentSettings: {Transition}} = contextSettingsState;
	const style = {
		transform: Transition === 'Slide' && `translateX(-${translate}px)`,
		transition: Transition === 'Slide' && `transform ${transition}s  ease 0s`,
		width: `${width}px`
	};
	const renderChildren = () => {
		if (Transition === 'Flip') {
			return (
				<div
					className={classNames({
						[componentCss['flip-card']]: true,
						[componentCss['is-flipped']]: isFlipped && direction === 'right',
						[componentCss['is-flipped-anti']]: isFlipped && direction === 'left'
					})}
					style={{width: getWidth()}}
				>
					{children}
				</div>
			);
		} else {
			return children;
		}
	};

	const {url} = children[0].props;
	return (
		<div
			key={url}
			className={classNames({
				[componentCss['sliderContent']]: true,
				[componentCss['fade-in']]: Transition === 'Fade In',
				[componentCss['flip']]: Transition === 'Flip'
			})}
			style={style}
		>
			{renderChildren()}
		</div>
	);
};

SliderContent.propTypes = {
	children: PropTypes.array,
	direction: PropTypes.string,
	isFlipped: PropTypes.bool,
	transition: PropTypes.number,
	translate: PropTypes.number,
	width: PropTypes.number
};

export default SliderContent;
