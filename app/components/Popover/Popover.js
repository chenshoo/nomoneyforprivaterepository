import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// components
import BootstrapPopover from 'react-bootstrap/lib/Popover';


const Popover = ({ className, theme, ...rest }) => (
    <BootstrapPopover  className={classNames('box-popover', `theme-${theme}`, className)} {...rest}/>
);

Popover.propTypes = {
    theme: PropTypes.oneOf(['default', 'navy'])
}

export default Popover;