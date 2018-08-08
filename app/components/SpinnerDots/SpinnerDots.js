import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const SpinnerDots = ({ className, size, numberOfDots, theme,  ...rest }) => (
    <div className={classNames("box-spinner-dots", `theme-${theme}`, `size-${size}`, className)}>
        {_.times(numberOfDots, dot => <div/>)}
    </div>
);

SpinnerDots.defaultProps = {
    size: 'sm',
    theme: 'black',
    numberOfDots: 4
}

SpinnerDots.propTypes = {
    size: PropTypes.oneOf(['md', 'lg']),
    theme: PropTypes.oneOf(['black'])
}

export default SpinnerDots;