/* eslint-disable react/jsx-no-bind */

import {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {TabLayout, Tab} from '@enact/sandstone/TabLayout';
import {Panel, Header} from '@enact/sandstone/Panels';
import ImageList from '../../components/ImageList/ImageList';
import {getDeviceList, setCurrentDevice} from '../../actions/deviceActions';
import {getImageList, setSelectedImage} from '../../actions/imageActions';
import css from './MainPanel.module.less';

const MainPanel = ({devices, getListDevice, getListImage, setSelectedDevice, setSelectedImageId, ...rest}) => {
	useEffect(() => {
		getListDevice();
	}, [getListDevice]);

	const handleClose = () => {
		if (typeof window !== 'undefined') {
			window.close();
		}
	};

	const onSelectDevice = (device) => {
		setSelectedImageId(0);
		setSelectedDevice(device);
		getListImage(device.uri);
	};

	return (
		<Panel {...rest}>
			<Header
				onClose={handleClose}
			/>
			<TabLayout>
				{devices.map((device) => {
					return device.deviceList.length > 0 && device.deviceList.map((deviceList, index) => {
						return (
							deviceList.available ?
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
									/>
								</Tab> :
								null
						);
					});
				})}
			</TabLayout>
		</Panel>
	);
};

MainPanel.propTypes = {
	deviceList: PropTypes.array,
	devices: PropTypes.array,
	getListDevice: PropTypes.func,
	getListImage: PropTypes.func,
	setSelectedDevice: PropTypes.func,
	setSelectedImageId: PropTypes.func
};

const mapStateToProps = ({devices}) => {
	return {
		devices: devices.deviceList
	};
};

export default connect(
	mapStateToProps,
	{
		getListDevice: getDeviceList,
		getListImage: getImageList,
		setSelectedDevice: setCurrentDevice,
		setSelectedImageId: setSelectedImage
	}
)(MainPanel);
