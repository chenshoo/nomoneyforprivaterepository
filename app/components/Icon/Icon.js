import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// constants
import iconConstants from 'constants/iconConstants';

const Icon =  ({ name, top, className, onClick, isRound, size, theme, isActive }) => {

    return (
        <i style={{top : top}}
           onClick={onClick}
           className={classNames('box-icon',`size-${size}`,`theme-${theme}`, { 'clickable': _.isFunction(onClick) }, { 'active' : isActive }, { 'round': isRound }, iconConstants[name], className)}
        />
    )
}

Icon.defaultProps = {
    name: 'CLOSE',
    size: 'md',
    theme: 'default',
}

Icon.propTypes = {
    theme: PropTypes.oneOf(['default', 'white', 'black', 'pink-dark', 'pink', 'main-brand', 'gray-dark', 'gray-dark-no-hover', 'white-success', 'success']),
    size: PropTypes.oneOf(['xl', 'md' , 'xs', 'xxl', 'su[er'])
}

export default Icon;
