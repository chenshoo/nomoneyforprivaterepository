import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Text =  ({ className, onClick, children, theme, size, align, inline, capitalized, weight }) => {

    return (
        <p onClick={onClick} className={classNames('box-text', { 'clickable': _.isFunction(onClick) }, { 'text-capitalized': capitalized },  `weight-${weight}`, `text-${align}`, className, theme, `size-${size}`, { 'inline-block': inline })} >
            {children}
        </p>
    )
}

Text.defaultProps = {
    theme : 'white',
    size : 'md',
    weight: 300
}

Text.propTypes = {
    theme: PropTypes.oneOf(['black', 'white', 'pink', 'brand']),
    weight: PropTypes.oneOf([200,300,400,500,600]),
    size: PropTypes.oneOf(['sm', 'md' , 'lg']),
    capitalized: PropTypes.bool,
}

export default Text;
