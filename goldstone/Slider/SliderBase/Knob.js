import EnactPropTypes from '@enact/core/internal/prop-types';
import ComponentOverride from '@enact/ui/ComponentOverride';
import React from 'react';
import PropTypes from 'prop-types';

const KnobBase = ({orientation, proportion, tooltipComponent, value, ...rest}) => {
	return (
		<div {...rest}>
			<ComponentOverride
				component={tooltipComponent}
				orientation={orientation}
				proportion={proportion}
			>
				{value}
			</ComponentOverride>
		</div>

	);
};

KnobBase.propTypes = {

	/**
		 * The orientation of the slider, either `"horizontal"` or `"vertical"`.
		 *
		 * @type {String}
		 * @default "horizontal"
		 * @public
		 */
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),

	/**
		 * A number between 0 and 1 representing the proportion of the `value` in terms of `min`
		 * and `max` props of the slider.
		 *
		 * @type {Boolean}
		 * @public
		 */
	proportion: PropTypes.number,

	/**
		 * Adds a tooltip to the knob using the provided component.
		 *
		 * The following props are forwarded to the tooltip:
		 *
		 * * `children` - The `value` prop from the slider
		 * * `orientation` - The value of the `orientation` prop from the slider
		 * * `proportion` - The value of the `proportion` prop from the knob
		 *
		 * This prop accepts either a Component (e.g. `MyTooltip`} which will be instantiated with
		 * the above props or a component instance (e.g. `<MyTooltip customProp="value" />`) which
		 * will have its props merged with the above props.
		 *
		 * @see {@link ui/ComponentOverride}
		 *
		 * @type {Function|Element}
		 * @public
		 */
	tooltipComponent: EnactPropTypes.componentOverride,

	/**
		 * The value of the slider.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
	value: PropTypes.number
};
const Knob = React.memo(KnobBase);
export default Knob;
export {
	Knob,
	KnobBase
};