import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ActivityIndicator = ({ className, size }) => (
    <div id="activity-indicator" className={classNames('box-activity-indicator', `size-${size}`, className)}/>
)

ActivityIndicator.defaultProps = {
    size: 'md'
}

ActivityIndicator.PropTypes = {
    size: PropTypes.oneOf(['md', 'lg'])
}

export default ActivityIndicator;