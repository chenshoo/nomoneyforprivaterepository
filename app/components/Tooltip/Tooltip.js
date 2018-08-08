import React from 'react';

// components
import BootstrapTooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

const Tooltip = ({ text, placement, children, defaultOverlayShown, ...rest }) => {
    if (!text) {
        return children || null;
    }

    const tooltip = <BootstrapTooltip id={text} {...rest} >{text}</BootstrapTooltip>;

    return (
        <OverlayTrigger defaultOverlayShown={defaultOverlayShown} className="box-tooltip" placement={placement} overlay={tooltip} {...rest} >
            {children}
        </OverlayTrigger>
    );
};

Tooltip.defaultProps = {
    placement: 'top',
    text: ''
};

export default Tooltip;