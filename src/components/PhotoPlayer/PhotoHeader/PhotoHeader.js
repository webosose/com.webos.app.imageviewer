/**
 * Item for files
 *
 * @module PhotoHeader
 */
import classNames from 'classnames';
import {Marquee} from '../../../../goldstone/Marquee/Marquee';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import css from './PhotoHeader.module.less';

class PhotoHeader extends Component {
	static propTypes = {
		/**
		 * The current image to be displayed.
		 *
		 * @type {Object}
		 * @public
		 */
		currentPhoto: PropTypes.object,
	};

	constructor (props) {
		super(props);
		this.state = {
			animation: css.show
		};
	}

	hideHeader = () => {
		this.setState({animation: css.show});
	};

	showHeader = () => {
		this.setState({animation: css.show});
	};

	toggleHeader = () => {
		const {animation} = this.state;
		if (animation === css.hide) {
			this.showHeader();
		} else if (animation === null || animation === css.show) {
			this.hideHeader();
		}
	};

	changeFileSize (fileSize) {
		if (typeof fileSize === 'undefined' || !fileSize) {
			return '';
		}
		let bytes = parseInt(fileSize),
			s = ['Bytes', 'KB', 'MB'],
			e = Math.floor(Math.log(bytes) / Math.log(1024));

		if (!isFinite(e)) {
			return '0 ' + s[0];
		} else {
			return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + s[e];
		}
	}

	findResolution (width, height) {
		let res = width !== 'undefined' && height !== 'undefined' ? `${width} X ${height}` : '';
		return res
	}

	render = () => {
		const
			{className, currentPhoto, ...rest} = this.props,
			{animation} = this.state,
			classes = classNames(className, css.playerInfoHeader, animation),
			fileName = currentPhoto && currentPhoto.title ? currentPhoto.title : '',
			size = currentPhoto && currentPhoto.file_size ? this.changeFileSize(currentPhoto.file_size) : 0,
			resolution = this.findResolution(currentPhoto.width, currentPhoto.height)

		const
			ariaText = fileName + '\n' + (size ? size : '') + '\n' + (resolution ? resolution : '');

		delete rest.currentPhoto;
		delete rest.dispatch;

		return (
			<div
				{...rest}
				aria-owns="IDpanel"
				data-spotlight-container-disabled={(animation === css.hide)}
				onMouseEnter={this.onEnter}
				onMouseLeave={this.onLeave}
				className={classes}
				role="region"
				aria-label={ariaText}
			>
				<Marquee marqueeOn="render" aria-label={fileName} className={css.playerInfoTitle}>{fileName}</Marquee>
				<div>
					{size ?
						<span>
							<div className={css.playerInfoSubTitle} aria-label={size}>{size}</div>
						</span> :
						null
					}
					{size && resolution ?
						<span>
							<div className={css.playerInfoSubTitle}>|</div>
						</span> :
						null
					}
					{resolution ?
						<span>
							<div className={css.playerInfoSubTitle} aria-label={resolution}>{resolution}</div>
						</span> :
						null
					}
				</div>
			</div>
		);
	};
}

export default PhotoHeader;
