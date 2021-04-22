/* eslint-disable react/jsx-no-bind */

import React, {useContext, useState} from 'react';
import classNames from 'classnames';
import {$L} from '@enact/i18n/$L';
import {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import Group from '@enact/ui/Group';
import PropTypes from 'prop-types';
import {SettingsContext} from '../Context/SettingsContext';
import Icon from '../../../../goldstone/Icon';
import IconButton from '../../../../goldstone/IconButton';
import RadioButton from '../../../../goldstone/RadioButton';
import componentCss from './ControlPanel.module.less';

const options = {
	Size: ['Original', 'Full'],
	Transition: ['Fade In', 'Slide', 'None'],
	Speed: ['Slow', 'Normal', 'Fast']
};
const SETTING_HEADER = 'Photo Settings';

const Settings = (props) => {

	const {state: {currentSettings, settings}, dispatch} = useContext(SettingsContext);
	const [index, setIndex] = useState(0);
	const [toggle, setToggle] = useState(false);
	const [header, setHeader] = useState(SETTING_HEADER);

	const subSettingsHandler = (id) => {
		const {text} = settings[id - 1];
		setHeader(text);
		setToggle(true);
		setIndex(options[text].findIndex(el => el === currentSettings[text]));
	};

	const handleClick = e => {
		setIndex(e.selected);
		dispatch({type: `SET_${header.toUpperCase()}`, value: options[header][e.selected]});
	};

	const CustomRadioItem = ({selected, ...rest}) => (
		<RadioButton
			style={{margin: 0, fontSize: '1rem', padding: '1rem 0.5rem', borderRadius: '1rem'}}
			selected={selected} {...rest}
			className={selected ? spotlightDefaultClass : null}
		/>
	);

	const renderSubSettings = () => (
		<Group
			childComponent={CustomRadioItem}
			itemProps={{inline: false}}
			select="radio"
			selectedProp="selected"
			selected={index}
			onSelect={handleClick}
		>
			{options[header]}
		</Group>
	);

	const closeSettings = () => {
		if (header === SETTING_HEADER) {
			props.settingsHandler(false);
		} else {
			setToggle(false);
			setHeader(SETTING_HEADER);
		}
	};

	const renderSettings = () => (
		<div>
			{settings.map((setting, indexKey) =>
				<div
					key={indexKey}
					name={setting.id}
					onClick={() => subSettingsHandler(setting.id)}
					className={classNames({
						[componentCss.subHeader]: true,
						[componentCss.lastSubHeader]: indexKey === currentSettings.length - 1
					})}
				>
					<div>
						{setting.text}
						<div
							className={componentCss.value}
						>
							{currentSettings[setting.text]}
						</div>
					</div>
					<Icon size="small" className={componentCss.button}>
						arrowsmallright
					</Icon>
				</div>
			)}
		</div>
	);

	return (
		<div className={componentCss.setting}>
			<div className={componentCss.header}>
				{header}
				<IconButton
					aria-label={$L('Go to Previous')}
					backgroundOpacity="transparent"
					className={componentCss.backButton}
					onClick={closeSettings}
					size="small"
					title=""
					tooltipProps={{'aria-hidden': true}}
				>
					arrowhookleft
				</IconButton>
			</div>
			{!toggle ? renderSettings() : renderSubSettings()}
		</div>
	);
};

Settings.propTypes = {
	/**
	 * Show the selected settings.
	 *
	 * @type {Boolean}
	 * @public
	 */
	selected: PropTypes.bool,
	/**
	 * Callback for settings menu.
	 *
	 * @type {Function}
	 * @public
	 */
	settingsHandler: PropTypes.func
};

export default Settings;
