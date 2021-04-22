import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {useSettingsContext} from '../Context/SettingsContext';
import componentCss from './SliderContent.module.less';

const SliderContent = ({children, translate, transition, width}) => {
	const stateSettingsContext = useSettingsContext();
	const contextSettingsState = stateSettingsContext.state || stateSettingsContext;
	const {currentSettings: {Transition}} = contextSettingsState;
	const style = {
		transform: Transition === 'Slide' && `translateX(-${translate}px)`,
		transition: Transition === 'Slide' && `transform ${transition}s  ease 0s`,
		width: `${width}px`
	};
	const renderChildren = () => {
		return children;
	};

	const {url} = children[0].props;
	return (
		<div
			key={url}
			className={classNames({
				[componentCss['sliderContent']]: true,
				[componentCss['fade-in']]: Transition === 'Fade In'
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
	transition: PropTypes.number,
	translate: PropTypes.number,
	width: PropTypes.number
};

export default SliderContent;
