import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// components
import BootstrapPanel from 'react-bootstrap/lib/Panel';

const Panel = ({ className, theme, ...rest }) => {

    return(
        <BootstrapPanel className={classNames('box-panel', `theme-${theme}`, className)} {...rest} />
    )
}

Panel.Body = BootstrapPanel.Body;

Panel.propTypes = {
    theme: PropTypes.oneOf('default', 'shadow')
}

export default Panel;