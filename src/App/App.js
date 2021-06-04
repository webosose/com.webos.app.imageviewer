import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Panels, Routable, Route} from '../../goldstone/Panels';
import ThemeDecorator from '../../goldstone/ThemeDecorator';
import MainPanel from '../views/MainPanel';
import ImageViewerPanel from '../views/ImageViewerPanel/ImageViewerPanel';
import {changePath} from '../actions/navigationActions';
import {getImageList} from '../actions/imageActions';

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);

const App = ({getListImage, handleNavigate, path, ...rest}) => {
	const onLaunch = async () => {
		const launchParams = JSON.parse(window.PalmSystem.launchParams);
		console.log(launchParams);
		if(launchParams && (launchParams.device_uri)) {
			await getListImage(launchParams.device_uri)
			handleNavigate('imageviewer');
		}
	};

	useEffect(() => {
		if (typeof window === 'object' && window.PalmSystem) {
			onLaunch();
		}
		document.addEventListener('webOSLaunch', onLaunch);
		document.addEventListener('webOSRelaunch', onLaunch);
		document.addEventListener('webOSLocaleChange', () => {
			window.location.reload();
		});
	}, []);

	return (
		<RoutablePanels {...rest} path={path} >
			<Route path="home" component={MainPanel} title="Home Page" />
			<Route path="imageviewer" component={ImageViewerPanel} title="Image Viewer" />
		</RoutablePanels>
	);
};

App.propTypes = {
	path: PropTypes.string
};

const mapStateToProps = ({path}) => {
	return {
		path: path.path
	};
};


export default connect(
	mapStateToProps,
	{
		getListImage: getImageList,
		handleNavigate: changePath
	}
)(ThemeDecorator(App));
