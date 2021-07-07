import {useCallback, useRef, useState} from 'react';
import Image from '@enact/ui/Image';
import PropTypes from 'prop-types';
import Slider, {SliderTooltip} from '@enact/sandstone/Slider/Slider';
import {getWidth} from '../util/util';
import onErrorImg from '../../../../assets/photovideo_splash.png';
import componentCss from './ZoomController.module.less';

const ZoomArea = ({fallBackImg = onErrorImg, url, width, zoomRef}) => {
	const [isImageFailed, setImageFailed] = useState(false);
	const imageSrc = url.replace(/ /g, '%20');
	const style = {
		minWidth: `${width}px`
	};

	const onImgError = useCallback(() => {
		setImageFailed(true);
	}, []);

	return (
		<Image
			className={componentCss.zoomSlide}
			onError={onImgError}
			ref={zoomRef}
			src={isImageFailed ? fallBackImg : imageSrc}
			style={style}
		/>
	);
};

ZoomArea.propTypes = {
	fallBackImg: PropTypes.string,
	url: PropTypes.string,
	width: PropTypes.number,
	zoomRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({current: PropTypes.any})
	])
};

const ZoomController = ({defaultRatio = 120, imageUrl, sliderMax = 200, sliderMin = 100, sliderStep = 10}) => {
	const [zoomRatio, setZoomRatio] = useState(defaultRatio);
	const getZoomAreaRef = useRef(null);
	const getMinimapThumb = useRef(null);
	const getMinimapimg = useRef(null);

	const updateMinimapPosition = () => {
		let zoomAreaRef = getZoomAreaRef.current.firstElementChild;
		let zoomXoffsetWidth = zoomAreaRef.offsetWidth / getMinimapThumb.current.offsetWidth;
		let zoomYoffsetWidth = zoomAreaRef.offsetHeight / getMinimapThumb.current.offsetHeight;
		zoomAreaRef.style.backgroundSize = (Math.floor(getMinimapimg.current.width * zoomXoffsetWidth)) + 'px ' + (Math.floor(getMinimapimg.current.height * zoomYoffsetWidth)) + 'px';
	};

	const zoomRatioChanging = useCallback((events) => {
		if (isNaN(events.value)) {
			return;
		}
		if (events.value === 200) {
			getMinimapThumb.current.style.width = '50%';
			getMinimapThumb.current.style.height = '50%';
		} else {
			let val = 100 - (events.value % 100) / 2;
			getMinimapThumb.current.style.width = `${val}%`;
			getMinimapThumb.current.style.height = `${val}%`;
		}
		setZoomRatio(events.value);
		updateMinimapPosition();
	}, []);

	return (
		<div
			className={componentCss.zoomSlide}
			ref={getZoomAreaRef}
		>
			<ZoomArea width={getWidth()} url={imageUrl} />
			<div className={componentCss.photoPreview}>
				<img alt={imageUrl} src={imageUrl} className={componentCss.photo} ref={getMinimapimg} />
				<div className={componentCss.magnifier} ref={getMinimapThumb} />
			</div>
			<div className={componentCss.zoomSlider}>
				<Slider
					orientation="vertical"
					min={sliderMin}
					max={sliderMax}
					step={sliderStep}
					value={zoomRatio}
					onChange={zoomRatioChanging}
					tooltip={
						<SliderTooltip
							percent
							side="above left"
						/>
					}
				/>
			</div>
		</div>
	);
};

ZoomController.propTypes = {
	defaultRatio: PropTypes.number,
	imageUrl: PropTypes.string,
	sliderMax: PropTypes.number,
	sliderMin: PropTypes.number,
	sliderStep: PropTypes.number
};

export default ZoomController;
export {
	ZoomArea,
	ZoomController
};
