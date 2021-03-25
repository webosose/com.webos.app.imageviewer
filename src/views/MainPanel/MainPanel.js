/* eslint-disable react/jsx-no-bind */

import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {TabLayout, Tab} from '../../../goldstone/TabLayout';
import {Panel, Header} from '../../../goldstone/Panels';
import ImageList from '../../components/ImageList/ImageList';
import {getDeviceList} from '../../actions/deviceActions';
import {getImageList} from '../../actions/imageActions';
import {changePath} from '../../actions/navigationActions';

import css from './MainPanel.module.less';

const MainPanel = ({devices, getListDevice, getListImage, imageList, handleNavigate, ...rest}) => {
console.log(imageList)
	useEffect(() => {
		getListDevice();
	}, [getListDevice]);

	const handleVideoNavigate = (url) => {
		handleNavigate(url);
	};

	return (
		<Panel {...rest}>
			<Header />
			{console.log(devices)}
			<TabLayout>
				{devices.map((device) => {
					return device.deviceList.length > 0 && device.deviceList.map((deviceList, index) => {
						return (
							<Tab
								className={css.tab}
								key={deviceList.uri}
								icon="usb"
								onTabClick={() => getListImage(deviceList.uri)}
								title={deviceList.name}
							>
								<ImageList
									key={index}
									imageList={imageList}
									handleNavigate={handleVideoNavigate}
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
		}))
	};
};

export default connect(mapStateToProps, mapDispatchToState)(MainPanel);
