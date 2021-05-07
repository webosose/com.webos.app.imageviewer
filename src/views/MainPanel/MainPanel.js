/* eslint-disable react/jsx-no-bind */

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {TabLayout, Tab} from '../../../goldstone/TabLayout';
import {Panel, Header} from '../../../goldstone/Panels';
import ImageList from '../../components/ImageList/ImageList';
import {getDeviceList, setCurrentDevice} from '../../actions/deviceActions';
import {getImageList} from '../../actions/imageActions';
import {changePath} from '../../actions/navigationActions';
import css from './MainPanel.module.less';

const MainPanel = ({devices, getListDevice, getListImage, imageList, handleNavigate, setSelectedDevice, ...rest}) => {
	useEffect(() => {
		getListDevice();
	}, [getListDevice]);

	const handleClose = () => {
		if(typeof window !== 'undefined') {
			window.close();
		}
	}

	const handleImageNavigatation = (url) => {
		handleNavigate(url);
	};

	const onSelectDevice = (device) => {
		setSelectedDevice(device);
		getListImage(device.uri)
	}

	return (
		<Panel {...rest}>
			<Header
				onClose={handleClose}
			/>
			{console.log(devices)}
			<TabLayout>
				{devices.map((device) => {
					return device.deviceList.length > 0 && device.deviceList.map((deviceList, index) => {
						return (
							<Tab
								className={css.tab}
								key={deviceList.uri}
								icon="usb"
								// onTabClick={() => getListImage(deviceList.uri)}
								onTabClick={() => onSelectDevice(deviceList)}
								title={deviceList.name}
							>
								<ImageList
									key={index}
									imageList={imageList}
									handleNavigate={handleImageNavigatation}
								/>
							</Tab>
						)
					})
				})}
			</TabLayout>
		</Panel>
	);
};

MainPanel.propTypes = {
	deviceList: PropTypes.array,
	getListDevice: PropTypes.func,
	getListImage: PropTypes.func,
	handleNavigate: PropTypes.func,
	imageList: PropTypes.array
};

const mapStateToProps = ({devices, images}) => {
	return {
		devices: devices.deviceList,
		imageList: images.imageList.results
	};
};

const mapDispatchToState = dispatch => {
	return {
		handleNavigate: (path) => dispatch(changePath(path)),
		getListDevice: () => dispatch(getDeviceList({
			subscribe: true
		})),
		getListImage: (uri) => dispatch(getImageList({
			uri: uri
		})),
		setSelectedDevice: (device) => dispatch(setCurrentDevice({
			device: device
		})),
	};
};

export default connect(mapStateToProps, mapDispatchToState)(MainPanel);
